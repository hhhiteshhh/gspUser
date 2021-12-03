import React, {useState, useContext, uesEffect, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {Colors} from '../../colors';
import {InitialContext} from '../../context';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import Loader from '../../components/Loader';
import otpScreenBg from '../../../assets/images/authScreenImages/otpScreen.png';
import Icon from 'react-native-easy-icon';
import StatusBarComponent from '../../components/StatusBarComponent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;
export default function OTPScreen({mobileNumber, navigation}) {
  const [otp, setOtp] = useState('');
  const [isLoading, setLoading] = useState(false);
  const {updateUser} = useContext(InitialContext);
  const handleOTPChange = otp => {
    setOtp(otp);
  };
  const handleReSendOtp = () => {
    setOtp('');
    functions()
      .httpsCallable('sendOtp')({
        mobile: mobileNumber,
      })
      .then(response => {
        console.log(response.data);
        ToastAndroid.show('New OTP sent', ToastAndroid.SHORT);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const submitOtp = async otp => {
    if (otp.length === 6) {
      try {
        setLoading(true);
        const VerifyOTPfunc = functions().httpsCallable('VerifyOtp');
        const success = await VerifyOTPfunc({
          mobile: mobileNumber,
          enteredOtp: otp,
        });

        if (success) {
          if (success.data) {
            if (success.data.type === 'success') {
              console.log('otp verified');
              ToastAndroid.show('otp verified', ToastAndroid.SHORT);

              let token = await createUser(`91${mobileNumber}`);
              if (token) {
                signInPhoneAuthUser(token);
              } else {
                console.log('cannot recieve token from verifyOTP');
              }
            } else {
              console.log('wrong otp');
              setLoading(false);
              ToastAndroid.show('Wrong OTP', ToastAndroid.SHORT);
            }
          }
        } else {
          console.warn('Woops, looks like something went wrong!');
          console.log('wrong otp');
          ToastAndroid.show('Wrong OTP', ToastAndroid.SHORT);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      alert('enter otp');
    }
  };
  const createUser = async number => {
    try {
      const createUserfunc = functions().httpsCallable('createUser');
      const success = await createUserfunc({
        uid: number,
      });
      if (success) {
        return success.data;
      } else {
        console.warn('cannot create user!');
        return null;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  const signInPhoneAuthUser = async token => {
    try {
      let user = await auth().signInWithCustomToken(token);
      let data = {
        type: 'user',
        firstName: '',
        lastName: '',
        phoneNumber: `91${mobileNumber}`,
        displayPictureUrl: '',
        uid: `91${mobileNumber}`,
        nationality: '',
        email: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedDetails: [],
      };
      if (user.additionalUserInfo) {
        if (user.additionalUserInfo.isNewUser === true) {
          try {
            await firestore()
              .collection('users')
              .doc(`91${mobileNumber}`)
              .set(data);
            updateUser();
          } catch (err) {
            console.log('err ', err);
          }
        } else {
          let doc1 = await firestore()
            .collection('users')
            .doc(`91${mobileNumber}`)
            .get();
          if (doc1.exists) {
            let doc = doc1.data();
            try {
              await firestore()
                .collection('users')
                .doc(`91${mobileNumber}`)
                .update({
                  lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
                });
              updateUser();
            } catch (e) {
              console.log('err', e);
            }
          } else {
            await firestore()
              .collection('users')
              .doc(`91${mobileNumber}`)
              .set(data);
            updateUser();
          }
        }
      }
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, ' ', errorMessage);
    }
  };
  useEffect(() => {
    if (otp.length === 6) {
      Keyboard.dismiss();
      submitOtp(otp);
    }
  }, [otp]);
  return (
    <View style={styles.root}>
      <StatusBarComponent backgroundColor={'white'} barStyle={'dark-content'} />
      <View
        style={{
          height: '100%',
          backgroundColor: Colors.white,
          marginTop: statusBarHeight + 10,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          overflow: 'hidden',
        }}>
        <ImageBackground source={otpScreenBg} style={styles.image}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 90,
              height: '100%',
            }}>
            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                top: 20,
                width: windowWidth,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 600,
              }}>
              <TouchableOpacity
                style={{position: 'absolute', left: 21}}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon
                  type="antdesign"
                  name="left"
                  size={25}
                  color={Colors.white}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 32,
                  fontWeight: '700',
                  lineHeight: 40,
                  fontFamily: 'Jost-SemiBold',
                }}>
                Getsn
              </Text>
              <Icon
                type="feather"
                name="camera"
                size={20}
                color={Colors.white}
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 32,
                  fontWeight: '700',
                  lineHeight: 40,
                  fontFamily: 'Jost-SemiBold',
                }}>
                ppers
              </Text>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.container}>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View>
                  <View
                    style={{
                      borderRadius: 20,
                      overflow: 'hidden',
                      width: '90%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop:
                        windowHeight < 600
                          ? windowHeight * 0.3
                          : windowHeight * 0.35,
                    }}>
                    <View
                      style={{
                        borderRadius: 20,
                        overflow: 'hidden',
                        backgroundColor: Colors.white,
                        height: 253,
                      }}>
                      <Text
                        style={{
                          paddingTop: 8,
                          color: Colors.blackLogoText,
                          fontFamily: 'Jost-SemiBold',
                          fontSize: 20,
                          lineHeight: 29,
                          fontWeight: '500',
                          paddingLeft: 15,
                          height: 38,
                        }}>
                        Enter your OTP{'\n'}
                      </Text>
                      <Text
                        style={{
                          color: Colors.blackLogoText,
                          fontSize: 12,
                          marginLeft: 15,
                          fontFamily: 'Jost-SemiBold',
                          fontWeight: '400',
                        }}>
                        We have sent a one time password to{'\n'}+91{' '}
                        {mobileNumber}{' '}
                      </Text>

                      <TextInput
                        autoFocus={true}
                        value={otp}
                        onChangeText={code => handleOTPChange(code)}
                        autoFocus={true}
                        keyboardType={'numeric'}
                        style={styles.textInput}
                        importantForAutofill={'yes'}
                        maxLength={6}
                        onSubmitEditing={() => {
                          submitOtp(otp);
                        }}
                      />
                      {isLoading ? (
                        <View
                          style={{
                            marginTop: 'auto',
                            marginBottom: 'auto',
                          }}>
                          <Loader color={Colors.blue} size={50} />
                        </View>
                      ) : (
                        <>
                          <View
                            style={{
                              width: '80%',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              marginTop: 20,
                            }}>
                            <Text
                              style={{
                                color: Colors.blackLogoText,
                                fontSize: 13,
                                fontFamily: 'Jost-SemiBold',
                                fontWeight: '400',
                                textAlign: 'center',
                              }}>
                              Didn’t receive the code?
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                handleReSendOtp();
                              }}>
                              <Text
                                style={{
                                  fontSize: 13,
                                  paddingLeft: 3,
                                  fontFamily: 'Jost-SemiBold',
                                  color: Colors.blue,
                                  textAlign: 'center',
                                }}>
                                Resend Now
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <Text
                            style={{
                              textAlign: 'center',
                              marginTop: 11,
                              color: Colors.blackLogoText,
                              fontSize: 12,
                              fontFamily: 'Jost-SemiBold',
                              fontWeight: '500',
                            }}>
                            OR
                          </Text>
                          <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{marginBottom: 20}}>
                            <Text
                              style={{
                                fontSize: 13,
                                marginTop: 14,
                                lineHeight: 19,
                                fontFamily: 'Jost-SemiBold',
                                color: Colors.blue,
                                textAlign: 'center',
                              }}>
                              Edit the Phone Number
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    height: windowHeight + statusBarHeight,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  inputView: {},
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: windowWidth,
    height: windowHeight + statusBarHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    tintColor: Colors.white,
    overlayColor: Colors.white,
  },

  underlineStyleBase: {
    width: 30,
    height: 65,
    padding: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    fontSize: windowHeight < 600 ? 36 : 44,
    fontWeight: 'bold',
    color: Colors.blackLogoText,
    borderColor: Colors.blackLogoText,
  },
  underlineStyleHighLighted: {},
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#000',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    color: Colors.blackLogoText,
    fontSize: 32,
    // fontFamily: 'Jost-SemiBold',
    fontWeight: 'bold',
  },
});
