import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import paymentScreenBg from '../../../../assets/images/bookingScreenImages/payment.jpeg';
import tickMark from '../../../../assets/images/bookingScreenImages/Groupdone.png';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../../colors';
import {useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import {CommonActions} from '@react-navigation/native';
import StatusBarComponent from '../../../components/StatusBarComponent';

const windowWidth = Dimensions.get('window').width;

const PaymentConfirm = ({navigation}) => {
  useEffect(() => {
    setTimeout(function () {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'HomePage',
              params: {
                bookingScreen: true,
              },
            },
          ],
        }),
      );
    }, 3500);
  }, [navigation]);
  return (
    <ImageBackground source={paymentScreenBg} style={styles.image}>
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
          Congratulations!!!{'\n'} Your Booking is {'\n'} confirmed
        </Text>
        <Animatable.View
          animation="zoomIn"
          delay={1500}
          style={{width: '100%'}}>
          <FastImage
            source={tickMark}
            resizeMode="contain"
            style={{
              width: 86,
              height: 86,
              resizeMode: 'contain',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 24,
            }}
          />
        </Animatable.View>
      </View>
    </ImageBackground>
  );
};

export default PaymentConfirm;

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
