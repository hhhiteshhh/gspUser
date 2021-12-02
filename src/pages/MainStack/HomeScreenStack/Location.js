import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Colors} from '../../../colors/index';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-easy-icon';
import LinearGradient from 'react-native-linear-gradient';
import StatusBarComponent from '../../../components/StatusBarComponent';
import 'intl';
import 'intl/locale-data/jsonp/en';
import firestore from '@react-native-firebase/firestore';
import ProgressiveImage from '../../../components/ProgressiveImage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;

function Location({navigation, route, isGuestUser}) {
  const {eventSelected, event, bookingAvailable = true} = route.params;
  const [clammped, setClammped] = useState(true);
  const [amount, setAmount] = useState(0);
  const [country, setCountry] = useState();
  const [loading, setLoading] = useState(true);
  var formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  useEffect(() => {
    if (route?.params?.countryId) {
      firestore()
        .collection('countries')
        .doc(route?.params?.countryId)
        .onSnapshot(doc => {
          setCountry(doc.data());
        });
    }
  }, [route.params.countryId]);

  useEffect(() => {
    if (route?.params?.data?.basicPackage) {
      firestore()
        .collection('packages')
        .doc(route?.params?.data?.basicPackage)
        .onSnapshot(doc => {
          setAmount(doc.data());
        });
    }
  }, [route.params.data.basicPackage]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: statusBarHeight,
          width: windowWidth,
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 999,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{marginLeft: 20}}>
          <Icon
            type="antdesign"
            name="left"
            size={25}
            color={Colors.blackLogoText}
            style={{marginTop: 5}}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.blackLogoText,
            fontSize: windowWidth < 370 ? 22 : 32,
            fontFamily: 'Jost-SemiBold',
            marginLeft: 10,
            textTransform: 'capitalize',
          }}>
          {route.params.data.cityName}{' '}
          <Text
            style={{
              color: Colors.blackLogoText,
              fontSize: windowWidth < 370 ? 12 : 18,
              fontFamily: 'Jost-Medium',
              textTransform: 'uppercase',
            }}>
            {country?.countryName}
          </Text>
        </Text>
      </View>
      <Swiper
        paginationStyle={{
          right: 'auto',
          left: 25,
          top: windowHeight * 0.65 - 40,
        }}
        style={styles.wrapper}
        dotStyle={{
          borderWidth: 1,
          borderColor: 'white',
          width: 7,
          height: 4,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
        activeDotStyle={{width: 28, height: 4}}
        dotColor="transparent"
        removeClippedSubviews={true}
        activeDotColor="#0ee2e2"
        loop={false}>
        {route.params.data.displayImages.map((image, id) => (
          <View key={`data-${id}`}>
            <StatusBarComponent backgroundColor={'transparent'} />
            <ProgressiveImage
              thumbnailSource={{
                uri: image,
              }}
              style={{
                width: windowWidth,
                height: windowHeight * 0.65,
              }}
              source={{uri: image}}
              resizeMode="cover"
            />
            {/* {loading ? (
              <ActivityIndicator
                style={{
                  width: windowWidth,
                  height: windowHeight * 0.65,
                }}
                color="#0defef"
              />
            ) : (
              <FastImage
                resizeMode={'cover'}
                style={{
                  width: windowWidth,
                  height: windowHeight * 0.65,
                }}
                source={{uri: image}}
              />
            )} */}
          </View>
        ))}
      </Swiper>
      <View style={{}}>
        <ScrollView style={{height: windowHeight * 0.35, marginTop: 12}}>
          <Text
            numberOfLines={clammped ? 2 : 20}
            ellipsizeMode={clammped ? 'tail' : 'clip'}
            style={{
              fontSize: 17,
              marginLeft: 20,
              marginRight: 20,
              lineHeight: 20,
              color: '#000',
            }}>
            {route.params.data.description}
          </Text>
          <TouchableOpacity
            style={{marginLeft: 20, marginTop: 5}}
            onPress={() => {
              setClammped(!clammped);
            }}>
            <Text style={{fontSize: 17, color: Colors.blue}}>
              {clammped ? 'Read more' : 'Read less'}
            </Text>
          </TouchableOpacity>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{
              marginBottom: 26,
              marginTop: 20,
            }}>
            {route.params.data.memories.map((destination, id) => (
              <View
                key={id}
                style={{
                  borderRadius: 15,
                  overflow: 'hidden',
                  marginLeft: 20,
                  elevation: 4,
                  shadowColor: '#fff',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 1,
                  shadowRadius: 1.41,
                }}>
                <ProgressiveImage
                  thumbnailSource={{
                    uri: `${destination}`,
                  }}
                  style={styles.image1}
                  source={{uri: destination}}
                  resizeMode="cover"
                  borderRadius={11}
                  // elevation={10}
                />
                {/* <FastImage
                  key={id}
                  style={styles.image1}
                  source={{uri: destination}}
                /> */}
              </View>
            ))}
          </ScrollView>
          {bookingAvailable && (
            <>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0.5, y: 0}}
                colors={['#0ee2e2', '#10bef4']}
                style={{
                  borderRadius: 20,
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 11,
                }}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    margin: 2,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      color: Colors.blackLogoText,
                      fontSize: 17,
                      fontFamily: 'Jost-SemiBold',
                      padding: 8,
                    }}>
                    Starts from{'\n'}
                    <Text style={{color: Colors.blue}}>
                      INR {formatter.format(amount?.price)}
                    </Text>
                  </Text>
                </View>
              </LinearGradient>
              <TouchableOpacity
                onPress={() => {
                  isGuestUser === 'true'
                    ? navigation.navigate('LoginNotice')
                    : eventSelected
                    ? navigation.navigate('AddBooking', {
                        location: route.params.location.location,
                        event: event,
                        amount: amount,
                      })
                    : navigation.navigate('ChooseCategory', {
                        location: route.params.data,
                        locationId: route.params.data.id,
                        amount: amount,
                      });
                }}
                style={{position: 'absolute', bottom: 12, right: 10}}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0.5, y: 0}}
                  colors={['#0ee2e2', '#10bef4']}
                  style={{
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    marginRight: 10,
                    elevation: 5,
                    shadowColor: 'rgba(13,239,0,0.15)',
                    shadowOffset: {width: 0, height: 0.1},
                    shadowOpacity: 0.8,
                    shadowRadius: 0.41,
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: 25,
                      fontFamily: 'Jost-SemiBold',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      padding: 15,
                    }}>
                    Next{'  '}
                    <Icon type="antdesign" name="arrowright" size={25} />
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
}

export default Location;

const styles = StyleSheet.create({
  wrapper: {height: windowHeight * 0.7},
  image1: {
    width: 92,
    height: 93,
    resizeMode: 'cover',
    borderRadius: 11,
  },
});
