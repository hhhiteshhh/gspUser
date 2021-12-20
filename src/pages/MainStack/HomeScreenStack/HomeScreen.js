import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import {Colors} from '../../../colors';
import Icon from 'react-native-easy-icon';
import RecommendedTravel from '../../../components/RecommendedTravel';
import Categories from '../../../components/Categories';
import LinearGradient from 'react-native-linear-gradient';
import PopularSpotsPicture from '../../../components/PopularSpotsPicture';
import StatusBarComponent from '../../../components/StatusBarComponent';
import LoadingPlaceHolder from '../../../components/LoadingPlaceHolder';
import ProgressiveImage from '../../../components/ProgressiveImage';
import InstaStory from 'react-native-insta-story';

const statusBarHeight = StatusBar.currentHeight;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function HomeScreen({
  navigation,
  data,
  isGuestUser,
  categories,
  exploreScreenData,
  // AllStories,
  AllStories,
  // chatsId,
  uid,
}) {
  const [chatsId, setChatsId] = useState([]);
  const [popularDestinationData, setPopularDestinationData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [photographersMessagesId, setPhotographerMessagesId] = useState([]);
  const [messagesLength, setMessagesLength] = useState();
  const [storiesData, setStoriesData] = useState([]);
  // const [AllStories, setAllStories] = useState([]);
  const [storyDataWithSeenBy, setstoryDataWithSeenBy] = useState();
  const [storyData, setStoryData] = useState([]);

  useEffect(() => {
    let newArray = AllStories?.filter(function (el) {
      return el.status === 'published';
    });
    setStoriesData(newArray);
  }, [AllStories]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    let data = [];
    exploreScreenData?.map((item, index) => {
      if (item?.isPopular) {
        firestore()
          .collection('cities')
          .doc(item?.city)
          .onSnapshot(doc => {
            data.push({...item, ...doc.data()});
            setPopularDestinationData(data);
          });
      }
    });
  }, [data, exploreScreenData]);
  useEffect(() => {
    let data = [];
    exploreScreenData?.map((item, index) => {
      if (item?.isRecommended) {
        firestore()
          .collection('cities')
          .doc(item?.city)
          .onSnapshot(doc => {
            data.push({...item, ...doc.data()});
            setRecommendedData(data);
          });
      }
    });
    if (uid) {
      firestore()
        .collection('chats')
        .where('users', 'array-contains', uid)
        .onSnapshot(chatSnapshot => {
          setChatsId(
            chatSnapshot?.docs.map(chat => ({id: chat.id, data: chat.data()})),
          );
        });
    }
  }, [exploreScreenData]);
  // useEffect(
  //   () =>
  //     firestore()
  //       .collection('stories')
  //       .orderBy('timestamp', 'desc')
  //       .onSnapshot(snapshot =>
  //         setAllStories(
  //           snapshot?.docs?.map(doc => ({id: doc.id, ...doc.data()})),
  //         ),
  //       ),
  //   [],
  // );
  useEffect(() => {
    let seenByUser = [];
    let notSeenByUser = [];
    storiesData?.map(item => {
      firestore()
        .collection('stories')
        .doc(item.uid)
        .collection('seenBy')
        .doc(uid)
        .get()
        .then(doc => {
          if (doc.data()) {
            seenByUser.push({...item, ...doc.data()});
          } else {
            notSeenByUser.push({...item});
          }
          setstoryDataWithSeenBy([...notSeenByUser, ...seenByUser]);
        });
    });
  }, [AllStories, storiesData]);

  useEffect(() => {
    setStoryData(
      storyDataWithSeenBy?.map(item => ({
        user_id: item.id,
        user_image: item.thumbnail,
        user_name: item.title,
        stories: item.stories,
        user: item.user || '',
      })),
    );
  }, [storyDataWithSeenBy]);

  useEffect(() => {
    let data = [];
    chatsId?.map(id => {
      firestore()
        .collection('chats')
        .doc(id?.id)
        .onSnapshot(snapshot => {
          data.push({id: snapshot.id, ...snapshot.data()});
          setPhotographerMessagesId(data);
        });
    });
  }, [chatsId, uid, exploreScreenData, data]);
  useEffect(() => {
    var newArray = photographersMessagesId?.filter(function (el) {
      return el.messageForUser === true;
    });
    setMessagesLength(newArray?.length);
  }, [photographersMessagesId]);

  const addSeenBy = item => {
    if (uid) {
      firestore()
        .collection('stories')
        .doc(item.user_id)
        .collection('seenBy')
        .doc(uid)
        .set({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: uid,
        });
    }
  };

  return (
    <>
      <StatusBarComponent backgroundColor={Colors.base} />
      {isLoading ? (
        <View style={{flex: 1}}>
          <LoadingPlaceHolder />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <ScrollView
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={{position: 'relative'}}>
              <View style={styles.appBar}>
                <View style={styles.insideAppBar}>
                  <ProgressiveImage
                    thumbnailSource={{
                      uri:
                        data?.displayPictureUrl ||
                        'https://firebasestorage.googleapis.com/v0/b/getsnappers-b188f.appspot.com/o/avatar.jpg?alt=media&token=2271a542-fe3b-4ef8-b970-294dd29198ad',
                    }}
                    source={{
                      uri:
                        data?.displayPictureUrl ||
                        'https://firebasestorage.googleapis.com/v0/b/getsnappers-b188f.appspot.com/o/avatar.jpg?alt=media&token=2271a542-fe3b-4ef8-b970-294dd29198ad',
                    }}
                    style={{width: 48, height: 48, borderRadius: 50}}
                    resizeMode="cover"
                    borderRadius={50}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Jost-SemiBold',
                      marginLeft: 15,
                      fontWeight: '500',
                      color: '#000',
                    }}>
                    Hi{' '}
                    {data?.firstName
                      ? data?.firstName
                      : data?.phoneNumber
                      ? data?.phoneNumber.slice(2)
                      : 'Guest'}
                    ,
                  </Text>
                </View>
                {isGuestUser !== 'true' && (
                  <View style={{position: 'relative'}}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Chat');
                      }}>
                      <Icon
                        type="feather"
                        name="message-square"
                        size={25}
                        color={'#000'}
                      />

                      {messagesLength > 0 && (
                        <Text
                          style={{
                            backgroundColor: Colors.blue,
                            width: 18,
                            height: 18,
                            position: 'absolute',
                            top: -8,
                            right: -5,
                            textAlign: 'center',
                            borderRadius: 50,
                            color: Colors.white,
                            fontSize: 14,
                            fontWeight: 'bold',
                          }}>
                          {messagesLength}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <Text
                style={{
                  fontFamily: 'Jost-SemiBold',
                  fontWeight: '500',
                  fontSize: 22,
                  marginLeft: 20,
                  marginTop: 20,
                  color: '#000',
                }}>
                Let's Make Memories!
              </Text>

              <Text
                style={{
                  fontFamily: 'Jost-Medium',
                  fontSize: 13,
                  marginLeft: 20,
                  marginTop: 20,
                  fontWeight: '500',
                  color: '#000',
                }}>
                Travel Diaries
              </Text>
              <InstaStory
                data={storyData}
                duration={5}
                onStart={item => {
                  addSeenBy(item);
                }}
                onClose={item => console.log('close: ', item)}
                unPressedBorderColor={Colors.blue}
                pressedBorderColor={'rgba(128,128,128,0.5)'}
                avatarSize={65}
              />
              <View
                style={{
                  elevation: 10,
                  // width: windowWidth * 0.5,
                  marginHorizontal: 5,
                  // borderColor: 'red',
                  marginTop: 20,
                  borderRadius: 15,
                  // borderWidth: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: Colors.white,
                    // width: windowWidth,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Icon
                      type="antdesign"
                      name="appstore-o"
                      size={25}
                      color={Colors.blue}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Jost-Medium',
                        color: Colors.blackLogoText,
                        marginHorizontal: 10,
                        fontWeight: '500',
                      }}>
                      Categories
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('BrowseCategories', {seeMore: true})
                    }
                    style={{
                      lineHeight: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: 'Jost-SemiBold',
                        color: Colors.blue,
                        lineHeight: 16,
                        fontWeight: '500',
                      }}>
                      See more{'  '}
                    </Text>
                    <Icon
                      type="antdesign"
                      name="right"
                      size={15}
                      color={Colors.blue}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: Colors.white,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    // borderWidth: 3,
                    borderColor: Colors.white,
                    overflow: 'hidden',
                  }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.storiesContainer}
                    fadingEdgeLength={20}>
                    {categories?.map((category, index) => {
                      return (
                        <Categories
                          category={category}
                          key={index - 1}
                          navigation={navigation}
                          isGuestUser={isGuestUser}
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 20,
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Jost-Medium',
                    color: Colors.blackLogoText,
                    lineHeight: 23,
                    fontWeight: '500',
                  }}>
                  Popular Destinations
                </Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.storiesContainer1}>
                {popularDestinationData?.map((popularSpot, id) => (
                  <PopularSpotsPicture
                    key={id - 2}
                    data={popularSpot}
                    navigation={navigation}
                    isGuestUser={isGuestUser}
                  />
                ))}
              </ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginLeft: 20,
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Jost-Medium',
                    color: Colors.blackLogoText,
                    lineHeight: 23,
                    fontWeight: '500',
                  }}>
                  Recommended Destinations
                </Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.storiesContainer1}>
                {recommendedData?.map((RecommendedDestination, index) => {
                  return (
                    <RecommendedTravel
                      RecommendedDestination={RecommendedDestination}
                      key={index - 3}
                      navigation={navigation}
                      isGuestUser={isGuestUser}
                    />
                  );
                })}
              </ScrollView>
            </View>
            <View style={{height: 20}} />
          </ScrollView>
        </View>
      )}

      {!isLoading && (
        <TouchableOpacity
          onPress={() => {
            isGuestUser === 'true'
              ? navigation.navigate('LoginNotice')
              : navigation.navigate('BrowseCategories', {
                  seeMore: false,
                  name: 'Add a Booking',
                });
          }}
          style={{
            position: 'absolute',
            bottom: 9,
            right: 10,
            width: 142,
            height: 50,
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0.5, y: 0}}
            colors={['#0ee2e2', '#10bef4']}
            style={{
              borderRadius: 20,
              paddingHorizontal: 20,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: 14,
                fontWeight: '700',
                fontFamily: 'Jost-Regular',
                marginLeft: 10,
                lineHeight: 23,
                paddingVertical: 15,
              }}>
              Book Now
            </Text>
            <Icon
              type="antdesign"
              name="pluscircleo"
              size={16}
              color={Colors.white}
              style={{marginRight: 10, marginLeft: 6}}
            />
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.base,
    marginTop: statusBarHeight,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 27,
    paddingRight: 20,
  },
  insideAppBar: {
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  storiesContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    // paddingLeft: 15,
    // paddingRight: 10,
    borderWidth: 3,
    // marginLeft: 15,
    marginRight: 15,
  },
  storiesContainer1: {
    marginTop: 10,
  },
  readMore: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
    marginTop: 8,
    textTransform: 'capitalize',
  },
  // readMoreWrapper: {
  //   position: 'absolute',
  //   bottom: 0,
  //   width: '98%',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
});
