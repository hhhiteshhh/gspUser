import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {Colors} from '../../colors';
import Icon from 'react-native-easy-icon';
import {InitialContext} from '../../context';
import functions from '@react-native-firebase/functions';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginBgImage from '../../../assets/images/authScreenImages/loginScreen.png';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from 'react-native-check-box';
import StatusBarComponent from '../../components/StatusBarComponent';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;
export default function LoginScreen({
  navigation,
  mobileNumber,
  handleMobileNumber,
  ...props
}) {
  const {updateUser} = useContext(InitialContext);
  const [isLoading, setLoading] = useState(false);
  const [isAgreed, setAgreed] = useState(false);

  const skipLogin = async () => {
    try {
      await AsyncStorage.setItem('@isGuestUser', JSON.stringify(true));
      updateUser();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSendOtp = () => {
    if (mobileNumber.length === 10 && !isAgreed) {
      alert('Please accept Terms & Condtions');
    } else if (mobileNumber.length === 10 && isAgreed) {
      setLoading(true);
      functions()
        .httpsCallable('sendOtp')({
          mobile: mobileNumber,
        })
        .then(response => {
          console.log(response.data);
          setLoading(false);
          navigation.navigate('OTPScreen');
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    } else {
      alert('Please Enter a Valid Mobile Number');
    }
  };

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
        <ImageBackground source={loginBgImage} style={styles.image}>
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
                <ScrollView>
                  <View
                    style={{
                      borderRadius: 20,
                      overflow: 'hidden',
                      width: '90%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop:
                        windowHeight < 600
                          ? windowHeight * 0.2
                          : windowHeight * 0.28,
                    }}>
                    <View
                      style={{
                        borderRadius: 20,
                        overflow: 'hidden',
                        backgroundColor: Colors.white,
                      }}>
                      <Text
                        style={{
                          paddingTop: 26,
                          color: Colors.blackLogoText,
                          fontFamily: 'Jost-SemiBold',
                          fontSize: 28,
                          paddingLeft: 15,
                          textTransform: 'capitalize',
                        }}>
                        Login
                      </Text>
                      <TextInput
                        keyboardType="number-pad"
                        autoFocus
                        placeholder="Phone Number"
                        placeholderTextColor="gray"
                        style={{
                          height: 55,
                          fontFamily: 'Jost-SemiBold',
                          fontSize: 17,
                          paddingLeft: 0,
                          borderBottomWidth: 1,
                          borderBottomColor: Colors.blackLogoText,
                          marginBottom: 20,
                          marginLeft: 15,
                          width: '90%',
                          color: Colors.blackLogoText,
                        }}
                        maxLength={10}
                        onChangeText={text => {
                          handleMobileNumber(text);
                        }}
                        value={mobileNumber}
                      />
                      <TouchableOpacity
                        disabled={!mobileNumber || !isAgreed}
                        style={styles.button}
                        onPress={() => handleSendOtp()}>
                        <LinearGradient
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          colors={
                            !mobileNumber || !isAgreed
                              ? ['#d2ccc4', '#2f4353']
                              : ['#0ee2e2', '#10bef4']
                          }
                          style={{
                            borderRadius: 10,
                            opacity: !mobileNumber || !isAgreed ? 0.5 : 1,
                          }}>
                          <Text
                            style={{
                              color: Colors.white,
                              fontSize: 16,
                              fontFamily: 'Jost-SemiBold',
                              marginLeft: 18,
                              marginRight: 19,
                              padding: 10,
                              fontWeight: '500',
                              textAlign: 'center',
                            }}>
                            {isLoading ? <Loader /> : `Send OTP`}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: windowWidth,
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 7,
                        width: 57,
                        height: 57,
                        backgroundColor: Colors.white,
                      }}
                      onPress={() => console.log('fb login')}>
                      <Icon
                        type="entypo"
                        name="facebook-with-circle"
                        color={'#3B5998'}
                        size={35}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 7,
                        width: 57,
                        height: 57,
                        marginLeft: 24,
                        backgroundColor: Colors.white,
                      }}
                      onPress={() => console.log('google login')}>
                      <Icon
                        type="font-awesome"
                        name="google-plus-official"
                        color={'#DC4E41'}
                        size={35}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 7,
                        width: 57,
                        height: 57,
                        marginLeft: 24,
                        backgroundColor: Colors.white,
                      }}
                      onPress={() => console.log('apple login')}>
                      <Icon
                        type="antdesign"
                        name="apple1"
                        color={Colors.blackLogoText}
                        size={35}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderRadius: 10,
                      overflow: 'hidden',
                      width: '90%',
                      marginTop: 30,
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      backgroundColor: Colors.white,
                    }}>
                    <View
                      style={{
                        borderRadius: 10,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <CheckBox
                        style={{
                          transform: [{scale: isAgreed ? 1.25 : 1}],
                        }}
                        isChecked={isAgreed}
                        onClick={() => {
                          setAgreed(!isAgreed);
                        }}
                        checkBoxColor={Colors.blue}
                        checkedCheckBoxColor={'#0defef'}
                        uncheckedCheckBoxColor={Colors.blue}
                      />
                      <Text style={{paddingVertical: 16}}>
                        <Text
                          style={{
                            color: Colors.blackLogoText,
                            fontFamily: 'Jost-Bold',
                            fontSize: 11,
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                          }}>
                          {'  '}I agree to the{' '}
                          <Text
                            style={{
                              color: '#0defef',
                              fontFamily: 'Jost-Bold',
                              fontSize: 10,
                              fontWeight: 'bold',
                              textTransform: 'capitalize',
                            }}>
                            Terms & Conditions & Privacy Ploicy
                          </Text>
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      marginTop: 20,
                    }}
                    onPress={() => skipLogin()}>
                    <Text
                      style={{
                        color: Colors.blue,
                        fontSize: 28,
                        fontFamily: 'Jost-SemiBold',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}>
                      Skip
                    </Text>
                  </TouchableOpacity>

                  <View style={{height: 100}} />
                </ScrollView>
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
  image: {
    flex: 1,
    resizeMode: 'stretch',
    width: windowWidth,
    height: windowHeight + statusBarHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    tintColor: Colors.white,
    overlayColor: Colors.white,
  },
  button: {
    width: 135,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    elevation: 4,
  },
});
