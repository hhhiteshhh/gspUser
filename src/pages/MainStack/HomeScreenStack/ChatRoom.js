import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
  Keyboard,
} from 'react-native';
import {Colors} from '../../../colors';
import Icon from 'react-native-easy-icon';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import ProgressiveImage from '../../../components/ProgressiveImage';

const ChatRoom = ({navigation, route, uid}) => {
  const {recipient, messagesId, photoUrl, chatId, sender} = route.params;
  const [input, setInput] = useState();
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <ProgressiveImage
            thumbnailSource={{
              uri: photoUrl,
            }}
            style={{width: 40, height: 42}}
            source={{uri: photoUrl}}
            resizeMode="cover"
            borderRadius={50}
            marginLeft={-11}
          />

          <Text
            {...props}
            style={{
              color: Colors.blackLogoText,
              fontFamily: 'Jost-SemiBold',
              fontSize: 16,
              lineHeight: 23.4,
              fontWeight: '700',
              marginLeft: 15,
              padding: 0,
            }}>
            {recipient?.firstName
              ? `${recipient?.firstName} ${recipient?.lastName}`
              : `${recipient?.uid.slice(2)}`}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 10, padding: 0, marginRight: 6}}
          onPress={() => navigation.goBack()}>
          <Icon type="Entypo" name="chevron-left" size={25} color={'#000'} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 20, padding: 0}}
          // onPress={() => navigation.goBack()}
        >
          <Icon type="Feather" name="more-vert" size={25} color={'#000'} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: Colors.base,
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
      },
    });
  }, [navigation]);

  const sendMessage = () => {
    Keyboard.dismiss();
    firestore().collection('chats').doc(chatId).collection('messages').add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userId: uid,
      isRead: false,
    });
    firestore().collection('chats').doc(chatId).update({
      messageForPhotographer: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  useEffect(() => {
    const unsub = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        setMessages(snapshot?.docs?.map(doc => doc.data()));
      });
    return unsub;
  }, [chatId]);
  const [photographersMessagesId, setPhotographerMessagesId] = useState([]);
  useEffect(() => {
    let data = [];
    firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .where('userId', '!=', uid)
      .onSnapshot(snapshot => {
        snapshot.docs.map(doc => data.push({id: doc.id, ...doc.data()}));
        setPhotographerMessagesId(data);
      });
  }, []);

  useEffect(() => {
    photographersMessagesId?.map(id => {
      firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .doc(id?.id)
        .update({isRead: true});
    });
    firestore().collection('chats').doc(chatId).update({
      messageForUser: false,
    });
  }, [photographersMessagesId]);
  useEffect(() => AndroidKeyboardAdjust.setAdjustResize(), []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.base}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={80}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            <ScrollView
              contentContainerStyle={{paddingTop: 15}}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef?.current?.scrollToEnd({animated: true})
              }>
              {messages.map((message, id) =>
                message.userId === uid ? (
                  <View key={id} style={styles.receiver}>
                    <Text style={styles.receiverText}>{message.message}</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                    }}
                    key={id}>
                    <ProgressiveImage
                      thumbnailSource={{
                        uri: photoUrl,
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 50,
                      }}
                      source={{uri: photoUrl}}
                      resizeMode="cover"
                      borderRadius={50}
                      marginLeft={20}
                    />

                    <View key={id} style={styles.sender}>
                      <Text style={styles.senderText}>{message.message}</Text>
                    </View>
                  </View>
                ),
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TouchableOpacity>
                <Icon
                  type="Entypo"
                  name="attachment"
                  size={20}
                  color={'#d3d4d6'}
                  style={{marginLeft: 20, transform: [{rotate: '-45deg'}]}}
                />
              </TouchableOpacity>
              <TextInput
                placeholder="Type a message"
                style={styles.textinput}
                value={input}
                onChangeText={text => setInput(text)}
                placeholderTextColor="#d3d4d6"
                onSubmitEditing={sendMessage}
                onFocus={scrollViewRef?.current?.scrollToEnd({animated: true})}
                onPressIn={scrollViewRef?.current?.scrollToEnd({
                  animated: true,
                })}
              />
              <TouchableOpacity
              //   onPress={sendMessage}
              >
                <Icon
                  type="feather"
                  name="camera"
                  size={20}
                  color={'#d3d4d6'}
                  style={{marginRight: 20}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={sendMessage}>
                <Icon
                  type="Feather"
                  name="send"
                  size={20}
                  color={'#0defef'}
                  style={{marginRight: 20, transform: [{rotate: '-45deg'}]}}
                />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '88%',
    backgroundColor: Colors.white,
    elevation: 4,
    marginLeft: 20,
    marginRight: 'auto',
    marginBottom: 20,
    borderRadius: 10,
    height: 48,
  },
  textinput: {
    bottom: 0,
    height: 40,
    flex: 1,
    color: Colors.blackLogoText,
    borderRadius: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  receiverText: {color: 'white', fontSize: 17, lineHeight: 18},
  senderText: {
    color: 'black',
    fontSize: 17,
    lineHeight: 18,
  },
  senderName: {
    left: -5,
    paddingRight: 10,
    fontSize: 10,
    color: '#707070',
  },
  receiver: {
    padding: 15,
    backgroundColor: '#0ac2c2',
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginBottom: 13,
    maxWidth: '75%',
    position: 'relative',
    marginRight: 30,
  },
  sender: {
    padding: 15,
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginLeft: 13,
    marginBottom: 13,
    maxWidth: '75%',
    position: 'relative',
    elevation: 4,
  },
});
