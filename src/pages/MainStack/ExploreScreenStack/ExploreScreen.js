import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import StatusBarComponent from '../../../components/StatusBarComponent';
import Carousel from 'react-native-snap-carousel';
import {Colors} from '../../../colors';
import Icon from 'react-native-easy-icon';
import LinearGradient from 'react-native-linear-gradient';
import 'intl';
import 'intl/locale-data/jsonp/en';
import addBookingBg from '../../../../assets/images/bookingScreenImages/dubai.jpeg';
import Destination from '../../../components/Destination';
import ProgressiveImage from '../../../components/ProgressiveImage';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import LoadingPlaceholderForExploreScreen from '../../../components/LoadingPlaceholderForExploreScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;

const ExploreScreen = ({
  navigation,
  isGuestUser,
  exploreScreenData,
  popularDestinationData,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [results, setResults] = useState(popularDestinationData);
  const [searchQuery, setSearchQuery] = useState('');
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [country, setCountry] = useState();

  var formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  useEffect(() => {
    firestore()
      .collection('countries')
      .doc(popularDestinationData[activeIndex]?.country)
      .onSnapshot(doc => {
        setCountry(doc.data());
      });
    firestore()
      .collection('packages')
      .doc(exploreScreenData[activeIndex]?.basicPackage)
      .onSnapshot(doc => {
        setAmount(doc.data());
      });
  }, [activeIndex, popularDestinationData, exploreScreenData]);

  const renderItem = ({item, index}) => {
    return (
      <View key={index}>
        <ProgressiveImage
          thumbnailSource={{
            uri: item.displayPhotoUrl,
          }}
          source={{uri: item.displayPhotoUrl}}
          style={styles.image}
          resizeMode="cover"
        />
        {/* <Image
          style={styles.image}
          source={{uri: item.displayPhotoUrl}}>
          </Image> */}
      </View>
    );
  };
  const swipeRight = () => {
    setLoading(true);
    this._carousel.snapToItem(activeIndex + 1);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };
  const swipeLeft = () => {
    setLoading(true);
    this._carousel.snapToItem(activeIndex - 1);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };
  useEffect(() => AndroidKeyboardAdjust.setAdjustPan(), []);
  const onChangeSearch = q => {
    if (q.length == 0) {
      setFocus(false);
      setActiveIndex(0);
    }
    setSearchQuery(q);
    showResult(q);
  };
  const showResult = q => {
    setResults(popularDestinationData);
    if (q) {
      let ele = [];
      popularDestinationData.forEach(element => {
        if (element.cityName?.toLowerCase().includes(q.toLowerCase())) {
          ele.push(element);
        }
      });
      setResults(ele);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.root}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          if (searchQuery.length == 0) {
            setFocus(false);
          }
          setActiveIndex(0);
        }}>
        {focus ? (
          <ImageBackground
            source={addBookingBg}
            style={styles.imageBg}
            blurRadius={10}>
            <StatusBarComponent />
            <Text
              style={{
                fontSize: 22,
                top: 1.5 * statusBarHeight,
                paddingLeft: 18,
                color: Colors.white,
                position: 'absolute',
                zIndex: 999,
                fontFamily: 'Jost-SemiBold',
              }}>
              Explore
            </Text>
            <View
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                flex: 1,
              }}>
              <View style={styles.input}>
                <Icon
                  name={'search'}
                  type={'ionicon'}
                  color={'rgba(0,0,0,0.3)'}
                  size={20}
                  style={{marginLeft: 4}}
                />
                <TextInput
                  autoFocus={true}
                  placeholder="Lets find the perfect destination"
                  style={{height: 40, padding: 10, fontSize: 14, color: '#000'}}
                  placeholderTextColor="rgba(0,0,0,0.3)"
                  onChangeText={text => onChangeSearch(text)}
                  onSubmitEditing={() => {
                    onChangeSearch(searchQuery);
                  }}
                  value={searchQuery}
                  onFocus={() => {
                    setFocus(true);
                    setResults([]);
                  }}
                />
              </View>
              <View
                style={{
                  flexWrap: 'wrap',
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: 20,
                  marginTop:
                    windowWidth < 390
                      ? 5 * statusBarHeight + 25
                      : 5 * statusBarHeight,
                }}>
                {results?.map((city, id) => (
                  <TouchableOpacity
                    key={id}
                    onPress={() => {
                      setFocus(false);
                      setSearchQuery('');
                      navigation.navigate('Location', {
                        data: city,
                        countryId: city.country,
                      });
                    }}>
                    <Destination
                      title={city.cityName}
                      image={city.displayPhotoUrl}
                      // index={index}
                      id={id}
                      exploreResults
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ImageBackground>
        ) : (
          <ScrollView>
            <StatusBarComponent />
            <Text
              style={{
                fontSize: 22,
                top: 1.5 * statusBarHeight,
                marginLeft: 24,
                color: Colors.white,
                position: 'absolute',
                zIndex: 999,
                fontFamily: 'Jost-SemiBold',
              }}>
              Explore
            </Text>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flex: 0.9,
              }}>
              <View style={styles.input}>
                <Icon
                  name={'search'}
                  type={'ionicon'}
                  color={'rgba(0,0,0,0.3)'}
                  size={20}
                  style={{marginLeft: 4}}
                />
                <TextInput
                  placeholder="Lets find the perfect destination"
                  style={{height: 40, padding: 10, fontSize: 14, color: '#000'}}
                  placeholderTextColor="rgba(0,0,0,0.3)"
                  onChangeText={text => onChangeSearch(text)}
                  onSubmitEditing={() => {
                    onChangeSearch(searchQuery);
                  }}
                  value={searchQuery}
                  onFocus={() => {
                    setFocus(true);
                    setResults([]);
                  }}
                />
              </View>
            </View>
            <Carousel
              // ref={c => {
              //   this._carousel = c;
              // }}
              data={popularDestinationData}
              renderItem={renderItem}
              sliderWidth={windowWidth}
              itemWidth={windowWidth}
              onSnapToItem={index => {
                setLoading(true);
                setActiveIndex(index);
                setTimeout(() => {
                  setLoading(false);
                }, 300);
              }}
            />
            <View
              style={{
                minHeight: windowHeight / 2 + 20,
                backgroundColor: '#fff',
                width: windowWidth,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                marginTop: -25,
                padding: 5,
                position: 'relative',
              }}>
              <View style={styles.navigation}>
                <TouchableOpacity
                  onPress={() => swipeLeft()}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor:
                      activeIndex === 0 ? 'transparent' : Colors.white,
                    alignItems: 'center',
                  }}>
                  {activeIndex !== 0 && (
                    <Icon
                      type="antdesign"
                      name="left"
                      size={25}
                      color={Colors.blue}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => swipeRight()}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor:
                      activeIndex != popularDestinationData.length - 1
                        ? Colors.white
                        : 'transparent',
                    alignItems: 'center',
                  }}>
                  {activeIndex != popularDestinationData.length - 1 && (
                    <Icon
                      type="antdesign"
                      name="right"
                      size={25}
                      color={Colors.blue}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 40,
                  height: 5,
                  backgroundColor: '#636363',
                  marginTop: 34,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginBottom: 20,
                  borderRadius: 10,
                }}></View>
              {loading ? (
                <>
                  <LoadingPlaceholderForExploreScreen />
                </>
              ) : (
                <>
                  <View style={{marginLeft: 24}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 26,
                        paddingBottom: 5,
                        fontFamily: 'Jost-SemiBold',
                        color: '#000',
                        textTransform: 'capitalize',
                      }}>
                      {popularDestinationData[activeIndex]?.cityName}
                      <Text
                        style={{
                          color: Colors.blackLogoText,
                          fontSize: windowWidth < 370 ? 12 : 18,
                          fontFamily: 'Jost-Medium',
                          textTransform: 'uppercase',
                        }}>
                        {' '}
                        {country?.countryName}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        marginRight: 55,
                        fontWeight: '400',
                        fontFamily: 'Jost-Medium',
                        color: '#000',
                      }}>
                      {popularDestinationData[activeIndex]?.description}
                    </Text>
                  </View>
                  <View style={{marginLeft: 24, marginTop: 15}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        fontFamily: 'Jost-Bold',
                        lineHeight: 20,
                        marginBottom: 10,
                        color: '#000',
                        textTransform: 'capitalize',
                      }}>
                      A perfect Destination for:
                    </Text>
                    {popularDestinationData[
                      activeIndex
                    ]?.perfectDestinationFor?.map((destination, id) => (
                      <Text
                        style={{
                          fontSize: 18,
                          color: Colors.blue,
                          fontWeight: '500',
                          lineHeight: 26,
                          fontFamily: 'Jost-Medium',
                          textTransform: 'capitalize',
                        }}
                        key={id}>
                        {destination}
                      </Text>
                    ))}
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        fontFamily: 'Jost-Bold',
                        lineHeight: 20,
                        marginBottom: 10,
                        marginTop: 20,
                        color: '#000',
                        textTransform: 'capitalize',
                      }}>
                      Memories created here:
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={styles.storiesContainer1}
                      style={{
                        marginBottom: 20,
                      }}>
                      {popularDestinationData[activeIndex]?.memories.map(
                        (memory, id) => (
                          <View
                            key={id}
                            style={{
                              borderRadius: 11,
                              overflow: 'hidden',
                              marginLeft: id === 0 ? 0 : 5,
                              elevation: 2,
                              shadowColor: '#fff',
                              shadowOffset: {width: 0, height: 1},
                              shadowOpacity: 1,
                              shadowRadius: 1.41,
                            }}>
                            <ProgressiveImage
                              thumbnailSource={{
                                uri: memory,
                              }}
                              source={{uri: memory}}
                              style={styles.image1}
                              resizeMode="cover"
                              borderRadius={11}
                            />
                          </View>
                        ),
                      )}
                    </ScrollView>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        fontFamily: 'Jost-Medium',
                        lineHeight: 20,
                        color: '#000',
                        textTransform: 'capitalize',
                      }}>
                      Package starts from:
                    </Text>
                    <Text
                      style={{
                        color: Colors.blue,
                        fontSize: 22,
                        fontWeight: '500',
                        fontFamily: 'Jost-Medium',
                        lineHeight: 32,
                        marginBottom: 20,
                      }}>
                      INR {formatter.format(amount?.price)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        isGuestUser === 'true'
                          ? navigation.navigate('LoginNotice')
                          : navigation.navigate('Location', {
                              data: popularDestinationData[activeIndex],
                              countryId:
                                popularDestinationData[activeIndex].country,
                            });
                      }}
                      style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: 141,
                      }}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 0.5, y: 0}}
                        colors={['#0ee2e2', '#10bef4']}
                        style={{
                          borderRadius: 20,
                          padding: 15,
                          display: 'flex',
                          flexDirection: 'row',
                          marginBottom: 31,
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: 14,
                            fontFamily: 'Jost-SemiBold',
                            textAlign: 'center',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                          }}>
                          Book Now
                        </Text>
                        <Icon
                          type="antdesign"
                          name="pluscircleo"
                          size={15}
                          color={Colors.white}
                          style={{marginRight: 'auto'}}
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            <View style={{height: 50}} />
          </ScrollView>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  root: {
    height: windowHeight,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
    width: windowWidth,
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: windowWidth,
    height: windowHeight < 600 ? windowHeight * 0.8 : windowHeight * 0.6,
    // position: 'relative',
    resizeMode: 'cover',
  },
  image1: {
    width: 92,
    height: 93,
    resizeMode: 'cover',
    borderRadius: 11,
  },
  input: {
    display: 'flex',
    width: '88%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    marginLeft: 22,
    marginRight: 22,
    padding: 5,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 20,
    position: 'absolute',
    top: 1.7 * statusBarHeight + 20,
    zIndex: 999,
  },
  description: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  navigation: {
    marginLeft: 24,
    marginRight: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    marginTop: -74,
  },
});
