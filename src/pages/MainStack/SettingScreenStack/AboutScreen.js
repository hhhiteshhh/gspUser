import React, {useLayoutEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Colors} from '../../../colors';
import {InitialContext} from '../../../context/index';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../../components/Loader';
import Icon from 'react-native-easy-icon';
import REGEX from '../../../const/regularExp';
import ProgressiveImage from '../../../components/ProgressiveImage';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const AboutScreen = ({navigation, data}) => {
  const [firstName, setFirstName] = useState(data?.firstName);
  const [lastName, setLastName] = useState(data?.lastName);
  const [email, setEmail] = useState(data?.email);
  const [mobileNumber, setMobileNumber] = useState(data?.phoneNumber?.slice(2));
  const [nationality, setNationality] = useState(data?.nationality);
  const [response, setResponse] = React.useState(null);
  const {ready, user, isGuestUser} = useContext(InitialContext);
  const [isUploading, setIsUploading] = useState(false);
  const [txtEmailMsg, setTxtEmailMsg] = useState();
  const [txtNameMsg, setTxtNameMsg] = useState();
  const [lastTxtNameMsg, setLastTxtNameMsg] = useState();
  const [nationalityMsg, setNationalityMsg] = useState();

  const uid = user?._user?.uid;
  const galleryOptions = {
    mediaType: 'photo',
    videoQuality: 'high',
    quality: 1,
    maxWidth: 0,
    maxHeight: 0,
    includeBase64: false,
    cameraType: 'back',
    selectionLimit: 1,
    saveToPhotos: false,
    durationLimit: 0,
  };
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
          Edit
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
        backgroundColor: Colors.backgroundWhite,
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
      },
    });
  }, [navigation]);

  const checkEmail = email => {
    let result = REGEX.email.test(email);
    if (result) {
      return true;
    } else {
      return false;
    }
  };
  const checkName = name => {
    let result = REGEX.name.test(name);
    if (result) {
      return true;
    } else {
      return false;
    }
  };
  const updateProfile = async () => {
    const updatedDetails = [];
    if (firstName != data?.firstName) {
      updatedDetails.push({
        field: 'firstName',
        updatedAt: new Date(),
      });
    }
    if (lastName != data?.lastName) {
      updatedDetails.push({
        field: 'lastName',
        updatedAt: new Date(),
      });
    }
    if (email != data?.email) {
      updatedDetails.push({
        field: 'email',
        updatedAt: new Date(),
      });
    }
    if (mobileNumber != data?.phoneNumber?.slice(2)) {
      updatedDetails.push({
        field: 'phoneNumber',
        updatedAt: new Date(),
      });
    }
    if (nationality != data?.nationality) {
      updatedDetails.push({
        field: 'nationality',
        updatedAt: new Date(),
      });
    }

    if (response != null) {
      setIsUploading(true);
      var storageRef = storage().ref();
      let url = response?.assets[0].uri;
      url = url.split('#').pop().split('?').pop();
      let imageName = url.substring(url.lastIndexOf('/') + 1);
      storageRef
        .child(`users/${uid}/${imageName}`)
        .putFile(response?.assets[0].uri)
        .then(async snapshot => {
          await storage()
            .ref(`users/${uid}`)
            .child(imageName)
            .getDownloadURL()
            .then(url => {
              firestore()
                .collection('users')
                .doc(uid)
                .update({
                  displayPictureUrl: url,
                  updatedDetails: [
                    ...data?.updatedDetails,
                    {field: 'displayPicture', updatedAt: new Date()},
                  ],
                });
            });
          setResponse(null);
          setTimeout(function () {
            setIsUploading(false);
          }, 5000);
        });
    }
    firestore()
      .collection('users')
      .doc(uid)
      .update({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: `91${mobileNumber}`,
        email: email,
        nationality: nationality,
        updatedDetails: [...data?.updatedDetails, ...updatedDetails],
      });
    if (response != null) {
      setTimeout(function () {
        navigation.goBack(null);
      }, 5000);
    } else {
      navigation.goBack(null);
    }
  };

  const openGallery = () => {
    launchImageLibrary(galleryOptions, setResponse);
  };
  return (
    <ScrollView>
      <View style={{display: 'flex', justifyContent: 'space-between'}}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => !isUploading && openGallery()}>
          {isUploading ? (
            <View
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
              }}>
              <Loader color={Colors.blue} size={50} />
            </View>
          ) : (
            <ProgressiveImage
              thumbnailSource={{
                uri: response?.didCancel
                  ? data?.displayPictureUrl ||
                    'https://firebasestorage.googleapis.com/v0/b/getsnappers-b188f.appspot.com/o/avatar.jpg?alt=media&token=2271a542-fe3b-4ef8-b970-294dd29198ad'
                  : response?.assets[0]
                  ? response?.assets[0]?.uri
                  : data?.displayPictureUrl ||
                    'https://firebasestorage.googleapis.com/v0/b/getsnappers-b188f.appspot.com/o/avatar.jpg?alt=media&token=2271a542-fe3b-4ef8-b970-294dd29198ad',
              }}
              source={{
                uri: response?.didCancel
                  ? data?.displayPictureUrl ||
                    'https://firebasestorage.googleapis.com/v0/b/getsnappers-b188f.appspot.com/o/avatar.jpg?alt=media&token=2271a542-fe3b-4ef8-b970-294dd29198ad'
                  : response?.assets[0]
                  ? response?.assets[0]?.uri
                  : data?.displayPictureUrl ||
                    'https://firebasestorage.googleapis.com/v0/b/getsnappers-b188f.appspot.com/o/avatar.jpg?alt=media&token=2271a542-fe3b-4ef8-b970-294dd29198ad',
              }}
              style={{
                width: '100%',
                paddingTop: 400,
                overflow: 'hidden',
                // height: windowHeight * 0.5,
              }}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.label1}>Account Details</Text>
          <Text
            style={[
              styles.label,
              {
                paddingTop: 17,
                lineHeight: 12,
                fontWeight: '400',
                fontFamily: 'Jost-Medium',
                textTransform: 'uppercase',
              },
            ]}>
            FIRST NAME
          </Text>
          <TextInput
            autoComplete="name-given"
            style={styles.input}
            onChangeText={text => {
              setFirstName(text);
              setTxtNameMsg(
                checkName(text)
                  ? undefined
                  : 'Name is not valid!\n*Only albhabets are allowed!',
              );
              if (!text) {
                setTxtNameMsg();
              }
            }}
            value={firstName}
          />
          {txtNameMsg && (
            <View>
              <Text style={styles.errorText}>{txtNameMsg}</Text>
            </View>
          )}
          <Text
            style={[
              styles.label,
              {
                paddingTop: 17,
                lineHeight: 12,
                fontWeight: '400',
                fontFamily: 'Jost-Medium',
                textTransform: 'uppercase',
              },
            ]}>
            LAST NAME
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setLastName(text);
              setLastTxtNameMsg(
                checkName(text)
                  ? undefined
                  : 'Name is not valid!\n*Only albhabets are allowed!',
              );
              if (!text) {
                setLastTxtNameMsg();
              }
            }}
            value={lastName}
          />
          {lastTxtNameMsg && (
            <View>
              <Text style={styles.errorText}>{lastTxtNameMsg}</Text>
            </View>
          )}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginRight: 30,
            }}>
            <Text
              style={[
                styles.label,
                {
                  paddingTop: 17,
                  lineHeight: 12,
                  fontWeight: '400',
                  fontFamily: 'Jost-Medium',
                  textTransform: 'uppercase',
                },
              ]}>
              EMAIL ADDRESS
            </Text>
            {/* <TouchableOpacity>
              <Text style={styles.label2}>Verify Email</Text>
            </TouchableOpacity> */}
          </View>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setEmail(text);
              setTxtEmailMsg(
                checkEmail(text) ? undefined : 'Email is not valid !',
              );
              if (!text) {
                setTxtEmailMsg();
              }
            }}
            value={email}
          />
          {txtEmailMsg && (
            <View>
              <Text style={styles.errorText}>{txtEmailMsg}</Text>
            </View>
          )}
          <Text
            style={[
              styles.label,
              {
                paddingTop: 17,
                lineHeight: 12,
                fontWeight: '400',
                fontFamily: 'Jost-Medium',
                textTransform: 'uppercase',
              },
            ]}>
            PHONE NUMBER
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setMobileNumber(text)}
            value={mobileNumber}
            keyboardType="numeric"
            maxLength={10}
          />
          <Text
            style={[
              styles.label,
              {
                paddingTop: 17,
                lineHeight: 12,
                fontWeight: '400',
                fontFamily: 'Jost-Medium',
                textTransform: 'uppercase',
              },
            ]}>
            NATIONALITY
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setNationality(text);
              setNationalityMsg(
                checkName(text) ? undefined : 'Nationality is not valid !',
              );
              if (!text) {
                setNationalityMsg();
              }
            }}
            value={nationality}
          />
          {nationalityMsg && (
            <View>
              <Text style={styles.errorText}>{nationalityMsg}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            updateProfile();
          }}
          disabled={
            txtEmailMsg ||
            txtNameMsg ||
            lastTxtNameMsg ||
            mobileNumber.length !== 10 ||
            nationalityMsg
          }>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={
              txtEmailMsg ||
              txtNameMsg ||
              lastTxtNameMsg ||
              mobileNumber.length !== 10 ||
              nationalityMsg
                ? ['#d2ccc4', '#2f4353']
                : ['#0ee2e2', '#10bef4']
            }
            style={{
              borderRadius: 20,
              width: 141,
              height: 50,
              marginTop: 37,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: 14,
                fontFamily: 'Jost-Medium',
                marginLeft: 'auto',
                marginRight: 'auto',
                padding: 15,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              Save Changes
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={{height: 150}} />
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 30,
    // flex: 0.6,
    // marginTop: windowWidth < 390 ? windowHeight * 0.15 + 20 : 20,
  },
  label1: {
    color: Colors.blackLogoText,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Jost-SemiBold',
  },
  label: {
    color: Colors.inActiveColor,
    fontSize: 10,
  },
  input: {
    borderBottomWidth: 1,
    padding: 0,
    marginRight: 30,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Jost-Medium',
    color: '#000',
  },
  label2: {
    color: Colors.blue,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '500',
    fontFamily: 'Jost-Medium',
    paddingTop: 17,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    fontFamily: 'Objective-Medium',
  },
});
