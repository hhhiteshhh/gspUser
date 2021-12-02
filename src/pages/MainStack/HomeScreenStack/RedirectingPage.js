import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import redirectionBg from '../../../../assets/images/bookingScreenImages/redirection.jpeg';
import loading from '../../../../assets/images/bookingScreenImages/loading.gif';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../../colors';
import StatusBarComponent from '../../../components/StatusBarComponent';
import {useEffect} from 'react';
const windowWidth = Dimensions.get('window').width;

const RedirectingPage = ({navigation}) => {
  useEffect(() => {
    setTimeout(function () {
      navigation.navigate('PaymentConfirm');
    }, 5000);
  }, []);
  return (
    <ImageBackground source={redirectionBg} style={styles.image}>
      <StatusBarComponent />
      <View
        style={{
          height: 277,
          marginLeft: 20,
          marginRight: 20,
          borderRadius: 20,
          backgroundColor: Colors.white,
          paddingTop: 44,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: windowWidth < 390 ? 20 : 26,
            color: Colors.blackLogoText,
            textAlign: 'center',
            marginLeft: 34,
            marginRight: 34,
            lineHeight: 37,
          }}>
          Redirecting you to{'\n'} RazorPay
        </Text>
        <FastImage
          source={loading}
          resizeMode="cover"
          style={{
            width: 116,
            height: 116,
            resizeMode: 'contain',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default RedirectingPage;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: windowWidth,
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'center',
  },
});
