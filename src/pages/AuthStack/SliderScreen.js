import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Colors} from '../../colors';
import first from '../../../assets/images/onboardingImages/screen1.jpg';
import second from '../../../assets/images/onboardingImages/screen2.jpg';
import third from '../../../assets/images/onboardingImages/screen3.jpg';
import Icon from 'react-native-easy-icon';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import StatusBarComponent from '../../components/StatusBarComponent';
import ProgressiveImage from '../../components/ProgressiveImage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;

/****
 * NOTE
 * REMOVE PACKAGE BLUR VIEW IF IT IS NOT WORKING
 */

export default function SliderScreen({navigation}) {
  const images = [
    {
      path: first,
      index: 0,
    },
    {
      path: second,
      index: 1,
    },
    {
      path: third,
      index: 2,
    },
  ];
  return (
    <Animatable.View
      animation={'fadeIn'}
      style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          top: 50,
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
        <Icon type="feather" name="camera" size={20} color={Colors.white} />
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
      <Swiper
        style={styles.wrapper}
        activeDotColor="white"
        dotStyle={{
          marginBottom: 46,
          borderWidth: 1,
          borderColor: 'white',
          width: 7,
          height: 4,
          borderRadius: 2,
        }}
        activeDotStyle={{width: 28, height: 4, marginBottom: 46}}
        dotColor={Colors.white}
        removeClippedSubviews={true}
        activeDotColor="#0ee2e2"
        loop={false}>
        {images.map((data, id) => (
          <View style={styles.slide} key={`data-${id}`}>
            <StatusBarComponent barStyle={'white'} />
            <ProgressiveImage
              thumbnailSource={data.path}
              style={{
                width: windowWidth,
                height: windowHeight + statusBarHeight,
              }}
              source={data.path}
              resizeMode="cover"
            />
       
            <View style={styles.sliderTextContainer}>
              {data.index === 0 && (
                <View style={styles.card}>
                  <Text style={styles.SliderHeaderText}>Easy Booking</Text>
                  <Text style={styles.SliderText}>
                    Book within minutes. Stay in touch with your photographer
                    within 24 hours through our app
                  </Text>
                </View>
              )}
              {data.index === 1 && (
                <View style={styles.card}>
                  <Text style={styles.SliderHeaderText}>
                    Professional Photographer
                  </Text>
                  <Text style={styles.SliderText}>
                    Book our experts to capture every precious moment of your
                    holidays and relive them to the fullest.
                  </Text>
                </View>
              )}
              {data.index === 2 && (
                <View style={styles.card}>
                  <Text style={styles.SliderHeaderText}>
                    Fast & Reliable Delivery
                  </Text>
                  <Text style={styles.SliderText}>
                    Recieve your high quality pictures within the agreed date
                    and treasure your moments forever.
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                width: windowWidth,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: 133,
                  height: 40,
                }}
                onPress={() => navigation.navigate('LoginScreen')}>
                {data.index === 2 && (
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#0ee2e2', '#10bef4']}
                    style={{borderRadius: 10}}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: 18,
                        fontFamily: 'Jost-SemiBold',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: 8,
                      }}>
                      Login
                      {/* <Icon type="antdesign" name="rightcircleo" size={20} /> */}
                    </Text>
                  </LinearGradient>
                )}
                {data.index !== 2 && (
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: 22,
                      fontFamily: 'Jost-SemiBold',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      paddingTop: 10,
                      textDecorationLine: 'underline',
                    }}>
                    Skip
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Swiper>
    </Animatable.View>
  );
}
const styles = StyleSheet.create({
  container: {backgroundColor: 'transparent'},
  wrapper: {},
  slide: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  sliderTextContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  skipView: {
    width: windowWidth,
    position: 'absolute',
    bottom: 20,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderColor: '#6D6D6D',
    height: windowHeight + statusBarHeight,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 110,
  },
  SliderHeaderText: {
    color: Colors.white,
    fontSize: 25,
    lineHeight: 36,
    fontFamily: 'Jost-Medium',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '500',
    marginTop: 'auto',
  },
  SliderText: {
    color: Colors.white,
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
    width: 270,
    height: 104,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
