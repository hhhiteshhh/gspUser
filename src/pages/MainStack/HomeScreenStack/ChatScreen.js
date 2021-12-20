import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {Colors} from '../../../colors';
import Icon from 'react-native-easy-icon';
import chatScreenBg from '../../../../assets/images/chatScreenImages/chat.jpeg';
import noChatYet from '../../../../assets/images/chatScreenImages/noChat.png';
import Chat from '../../../components/Chat';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';
import StatusBarComponent from '../../../components/StatusBarComponent';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;
const ChatScreen = ({navigation, bookingData, uid}) => {
  const [photographerStatus, setPhotographerStatus] = useState([]);
  const [noChatYetImage, setNoChatImage] = useState();
  const [chatsId, setChatsId] = useState([]);
  const [sortedChatData, setSortedChatData] = useState([]);
  const someComplete = booking => booking?.some(v => v === true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <Text
          {...props}
          style={{
            color: Colors.blackLogoText,
            fontFamily: 'Jost-SemiBold',
            fontSize: 22,
            lineHeight: 26.4,
            fontWeight: '700',
            marginLeft: -17,
            padding: 0,
            textTransform: 'capitalize',
          }}>
          Chat
        </Text>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 20, padding: 0}}
          onPress={() => navigation.goBack()}>
          <Icon type="Entypo" name="chevron-left" size={25} color={'#000'} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: Colors.white,
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
      },
    });
  }, [navigation]);
  useEffect(() => {
    const dummyArray = [];
    bookingData.forEach(booking => {
      dummyArray.push(booking.photographerAllocated);
      setPhotographerStatus(dummyArray);
    });
  }, [bookingData]);
  useEffect(() => {
    setNoChatImage(someComplete(photographerStatus));
  }, [photographerStatus, bookingData]);
  useEffect(
    () =>
      firestore()
        .collection('chats')
        .orderBy('timestamp', 'desc')
        .onSnapshot(chatSnapshot => {
          setChatsId(
            chatSnapshot?.docs.map(chat => ({id: chat.id, data: chat.data()})),
          );
        }),
    [navigation],
  );
  useEffect(() => {
    let newArray = chatsId?.filter(function (el) {
      return el.data.users[1] === uid;
    });
    setSortedChatData(newArray);
  }, [chatsId, uid]);

  return (
    <ImageBackground
      source={chatScreenBg}
      style={styles.image}
      blurRadius={!noChatYetImage ? 10 : 0}>
      <StatusBarComponent />
      {noChatYetImage ? (
        <View
          style={{
            backgroundColor: Colors.white,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <View
            style={{
              marginTop: 28,
              left: '2.13%',
              backgroundColor: '#c4c4c4',
              height: 1,
              width: '85%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginLeft: 20,
            }}></View>
          <View
            style={{
              backgroundColor: Colors.white,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}>
            {sortedChatData?.map((chat, index) => {
              return (
                <Chat
                  key={index}
                  data={chat}
                  users={'chat.users'}
                  navigation={navigation}
                  uid={uid}
                />
              );
            })}

            <View
              style={{
                width: 40,
                height: 5,
                borderRadius: 10,
                backgroundColor: '#636363',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginVertical: 20,
              }}></View>
          </View>
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 1.5 * statusBarHeight,
            }}>
            <TouchableOpacity
              style={{position: 'absolute', left: 20}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon
                type="antdesign"
                name="left"
                size={20}
                color={Colors.white}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.white,
                fontFamily: 'Jost-SemiBold',
                fontSize: 24,
                fontWeight: '500',
                marginLeft: 55,
                lineHeight: 37,
              }}>
              Chat
            </Text>
          </View>
          <View
            style={{
              marginTop: '45%',
            }}>
            <View
              style={{
                width: windowWidth * 0.5,
                height: windowWidth * 0.5,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              <FastImage
                source={noChatYet}
                style={{
                  width: '100%',
                  height: '100%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.white,
                  fontFamily: 'Jost-SemiBold',
                  fontSize: 15,
                  marginTop: 20,
                }}>
                You have no active chats
              </Text>
            </View>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: windowWidth,
    height: windowHeight + statusBarHeight,
    display: 'flex',
    flexDirection: 'column',
  },
});
