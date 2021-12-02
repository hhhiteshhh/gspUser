import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
// import first from '../../assets/onboardingImages/screen1.png';
import firestore from '@react-native-firebase/firestore';

const Chat = ({data, navigation, uid}) => {
  const [recipient, setRecipient] = useState();
  const [sender, setSender] = useState();
  const [ChatData, setChatData] = useState([]);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(data?.data?.users[0])
      .onSnapshot(doc => setRecipient(doc.data()));
    firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(doc => setSender(doc.data()));
    firestore()
      .collection('chats')
      .doc(data?.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        setChatData(snapshot?.docs?.map(doc => ({id: doc.id, ...doc.data()})));
      });
  }, []);

  const length = ChatData.length;

  return (
    <View>
      <TouchableOpacity
        style={{
          padding: 15,
          paddingLeft: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 30,
          width: '80%',
        }}
        onPress={() => {
          navigation.navigate('ChatRoom', {
            recipient: recipient,
            messagesId: ChatData,
            photoUrl:
              recipient?.displayPictureUrl ||
              'https://firebasestorage.googleapis.com/v0/b/getsnappers-b188f.appspot.com/o/avatar.jpg?alt=media&token=2271a542-fe3b-4ef8-b970-294dd29198ad',
            chatId: data?.id,
            sender: sender,
          });
        }}>
        <FastImage
          source={{
            uri:
              recipient?.displayPictureUrl ||
              'https://firebasestorage.googleapis.com/v0/b/getsnappers-b188f.appspot.com/o/avatar.jpg?alt=media&token=2271a542-fe3b-4ef8-b970-294dd29198ad',
          }}
          style={{width: 25, height: 25, borderRadius: 50}}
        />
        <View style={{marginLeft: 5}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              fontFamily: 'Jost-SemiBold',
              color: '#000',
              textTransform: 'capitalize',
            }}>
            {recipient?.firstName
              ? `${recipient?.firstName} ${recipient?.lastName}`
              : `${recipient?.uid.slice(2)}`}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 14,
              fontFamily: 'Jost-Regular',
              color: '#000',
              fontWeight:
                ChatData[length - 1]?.userId !== uid &&
                !ChatData[length - 1]?.isRead
                  ? 'bold'
                  : '400',
            }}>
            {ChatData[length - 1]?.message}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: '#c4c4c4',
          height: 1,
          width: '85%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginLeft: 30,
        }}></View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
