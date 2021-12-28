import React, {useContext, useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import bookingScreenBg from '../../../../assets/images/bookingScreenImages/delhi.jpeg';
import noBookingsYet from '../../../../assets/images/bookingScreenImages/noBookingsYet.png';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../../colors';
import Icon from 'react-native-easy-icon';
import LinearGradient from 'react-native-linear-gradient';
import BookingCard from '../../../components/BookingCard';
import {InitialContext} from '../../../context';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import AppbarHeader from '../../../components/AppbarHeader';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;
export default function BookingScreen({
  navigation,
  bookingData,
  bookingNotifications,
  uid,
}) {
  const [changesAlert, setChangesAlert] = useState(
    bookingNotifications?.length > 0 ? true : false,
  );
  const [index, setIndex] = useState(1);
  const {signOut, isGuestUser} = useContext(InitialContext);
  const [id, setId] = useState();
  const [cancelBookingsStatus, setCancelBookingsStatus] = useState([]);
  const [cancelImage, setCancelImage] = useState();
  const [completeImage, setCompleteImage] = useState();
  const [loading, setLoading] = useState(true);
  const handleSignOut = () => {
    signOut();
  };
  const [cancelledBookings, setCancelBookings] = useState([]);
  const [onGoingBookings, setOnGoingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    bookingNotifications?.map(item => {
      firestore().collection('bookings').doc(item.id).update({
        notificationForUser: false,
      });
    });
  }, []);
  useEffect(() => {
    setLoading(true);
  }, [navigation]);

  useEffect(() => {
    let newArray = bookingData?.filter(function (el) {
      return el.createdBy === uid;
    });
    setUserBookings(newArray);
  }, [bookingData]);
  console.log(userBookings.length);
  useEffect(() => {
    let newArray = userBookings?.filter(function (el) {
      return el.bookingStatus === 'cancelled';
    });
    setCancelBookings(newArray);
  }, [userBookings]);
  useEffect(() => {
    let newArray = userBookings?.filter(function (el) {
      return el.bookingStatus === 'onGoing';
    });
    setOnGoingBookings(newArray);
  }, [userBookings]);
  useEffect(() => {
    let newArray = userBookings?.filter(function (el) {
      return el.bookingStatus === 'completed';
    });
    setCompletedBookings(newArray);
  }, [userBookings]);

  return (
    <View style={styles.root}>
      <ImageBackground
        source={bookingScreenBg}
        style={styles.image}
        blurRadius={15}
        onLoad={() => setLoading(false)}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppbarHeader title={'Bookings'} />
        {isGuestUser === 'true' ? (
          <View
            style={{
              flex: 0.85,
              resizeMode: 'cover',
              width: windowWidth,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 0.1 * statusBarHeight,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: windowWidth * 0.8,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    padding: 20,
                    color: Colors.white,
                    textAlign: 'center',
                    lineHeight: 35,
                    textTransform: 'capitalize',
                  }}>
                  Need to logout as Guest & login as User
                </Text>
                <TouchableOpacity
                  style={{
                    width: windowWidth * 0.3,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    margininBottom: 20,
                    paddingBottom: 20,
                  }}
                  onPress={() => handleSignOut()}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#0ee2e2', '#10bef4']}
                    style={{borderRadius: 10}}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: 15,
                        fontFamily: 'Jost-SemiBold',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: 10,
                      }}>
                      Log Out
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 18,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => setIndex(1)}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: index === 1 ? Colors.blue : 'transparent',
                  borderRadius: 0.5,
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: 'Jost-SemiBold',
                    fontSize: 20,
                    paddingBottom: 5,
                  }}>
                  On-Going
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIndex(2)}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: index === 2 ? Colors.blue : 'transparent',
                  borderRadius: 0.5,
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: 'Jost-SemiBold',
                    fontSize: 20,
                    paddingBottom: 5,
                  }}>
                  Completed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIndex(3)}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: index === 3 ? Colors.blue : 'transparent',
                  borderRadius: 0.5,
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: 'Jost-SemiBold',
                    fontSize: 20,
                    paddingBottom: 5,
                  }}>
                  Cancelled
                </Text>
              </TouchableOpacity>
            </View>
            {loading && (
              <SkeletonPlaceholder
                speed={1300}
                style={{height: windowHeight, width: windowWidth}}>
                <SkeletonPlaceholder.Item
                  height={120}
                  marginLeft={20}
                  marginRight={20}
                  marginVertical={20}
                  borderRadius={20}
                />
                <SkeletonPlaceholder.Item
                  height={120}
                  marginLeft={20}
                  marginRight={20}
                  marginVertical={20}
                  borderRadius={20}
                />
                <SkeletonPlaceholder.Item
                  height={120}
                  marginLeft={20}
                  marginRight={20}
                  marginVertical={20}
                  borderRadius={20}
                />
                <SkeletonPlaceholder.Item
                  height={120}
                  marginLeft={20}
                  marginRight={20}
                  marginVertical={20}
                  borderRadius={20}
                />
              </SkeletonPlaceholder>
            )}
            {!loading && index === 1 && (
              <>
                {onGoingBookings?.length === 0 ? (
                  <View
                    style={{
                      marginTop: 'auto',
                      marginBottom:
                        windowHeight > 600
                          ? windowWidth * 0.7
                          : windowWidth * 0.45,
                    }}>
                    <View
                      style={{
                        width: windowWidth * 0.5,
                        height: windowWidth * 0.5,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}>
                      <FastImage
                        source={noBookingsYet}
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
                          marginTop: -windowWidth * 0.1,
                        }}>
                        You have no On-Going booking
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('BrowseCategories', {
                          name: 'Add a Booking',
                        })
                      }
                      style={{
                        width: '70%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 55,
                      }}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#0ee2e2', '#10bef4']}
                        style={{
                          borderRadius: 12,
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: 15,
                            fontFamily: 'Jost-SemiBold',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            padding: 13,
                          }}>
                          <Icon type="antdesign" name="pluscircleo" size={15} />
                          {'  '} Add Booking
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <ScrollView>
                    {onGoingBookings?.map((booking, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setId(index);
                        }}>
                        <BookingCard
                          key={index}
                          navigation={navigation}
                          index={index}
                          id={id}
                          data={booking}
                          status={booking.bookingStatus}
                        />
                      </TouchableOpacity>
                    ))}
                    <View style={{height: 50}} />
                  </ScrollView>
                )}
              </>
            )}
            {!loading && index === 2 && (
              <>
                {completedBookings.length == 0 ? (
                  <View
                    style={{
                      marginTop: 'auto',
                      marginBottom:
                        windowHeight > 600
                          ? windowWidth * 0.7
                          : windowWidth * 0.45,
                    }}>
                    <View
                      style={{
                        width: windowWidth * 0.5,
                        height: windowWidth * 0.5,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}>
                      <FastImage
                        source={noBookingsYet}
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
                          marginTop: -windowWidth * 0.1,
                        }}>
                        You have no Completed booking
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('BrowseCategories', {
                          name: 'Add a Booking',
                        })
                      }
                      style={{
                        width: '70%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 55,
                      }}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#0ee2e2', '#10bef4']}
                        style={{
                          borderRadius: 12,
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: 15,
                            fontFamily: 'Jost-SemiBold',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            padding: 13,
                          }}>
                          <Icon type="antdesign" name="pluscircleo" size={15} />
                          {'  '} Add Booking
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <ScrollView>
                    {completedBookings?.map((booking, index) => (
                      <BookingCard
                        key={index}
                        navigation={navigation}
                        index={index}
                        data={booking}
                        status={booking.bookingStatus}
                      />
                    ))}
                    <View style={{height: 50}} />
                  </ScrollView>
                )}
              </>
            )}
            {!loading && index === 3 && (
              <>
                {cancelledBookings?.length === 0 ? (
                  <View
                    style={{
                      marginTop: 'auto',
                      marginBottom:
                        windowHeight > 600
                          ? windowWidth * 0.7
                          : windowWidth * 0.45,
                    }}>
                    <View
                      style={{
                        width: windowWidth * 0.5,
                        height: windowWidth * 0.5,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}>
                      <FastImage
                        source={noBookingsYet}
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
                          marginTop: -windowWidth * 0.1,
                        }}>
                        You have no Cancelled booking
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('BrowseCategories', {
                          name: 'Add a Booking',
                        })
                      }
                      style={{
                        width: '70%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 55,
                      }}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#0ee2e2', '#10bef4']}
                        style={{
                          borderRadius: 12,
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: 15,
                            fontFamily: 'Jost-SemiBold',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            padding: 13,
                          }}>
                          <Icon type="antdesign" name="pluscircleo" size={15} />
                          {'  '} Add Booking
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <ScrollView>
                    {cancelledBookings?.map((booking, index) => (
                      <BookingCard
                        key={index}
                        navigation={navigation}
                        index={index}
                        data={booking}
                        status={booking.bookingStatus}
                      />
                    ))}
                    <View style={{height: 50}} />
                  </ScrollView>
                )}
              </>
            )}
          </>
        )}
        <Modal
          isVisible={changesAlert}
          style={{
            justifyContent: 'center',
            margin: 0,
            height: 81,
            marginRight: 20,
            marginLeft: 20,
          }}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          animationInTiming={500}
          animationOutTiming={500}
          backdropColor="rgba(0,0,0,0.5)">
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
            <Text
              style={{
                color: '#000',
                textAlign: 'center',
                fontSize: 19,
                lineHeight: 27,
                paddingHorizontal: 26,
                paddingTop: 11,
              }}>
              Congratulations!!!{'\n'}
              The best suited photographer has{'\n'} been assigned to you
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 8,
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  borderColor: Colors.white,
                  paddingHorizontal: 33,
                  paddingVertical: 8,
                  width: 124,
                  height: 36,
                  backgroundColor: Colors.blue,
                  elevation: 4,
                }}
                onPress={() => {
                  setChangesAlert(!changesAlert);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: '500',
                    fontFamily: 'Jost-Medium',
                  }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    height: windowHeight,
    overflow: 'hidden',
  },
  inputView: {},
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: windowWidth,
    height: windowHeight,
    display: 'flex',
    flexDirection: 'column',
  },

  otpCell: {
    borderColor: 'white',
    borderWidth: 2,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 18,
    width: 45,
    height: 45,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    borderColor: Colors.white,
  },
  underlineStyleHighLighted: {
    borderColor: Colors.white,
  },
});
