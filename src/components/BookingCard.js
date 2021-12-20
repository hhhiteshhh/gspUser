import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Linking,
  Platform,
  Animate,
} from 'react-native';
import {Colors} from '../colors';
import Icon from 'react-native-easy-icon';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import ProgressiveImage from './ProgressiveImage';

const windowWidth = Dimensions.get('window').width;

const BookingCard = ({navigation, data, status}) => {
  const [locationData, setLocationData] = useState([]);
  const [packageData, setPackageData] = useState([]);
  const [viewDestinationData, setViewDestinationData] = useState([]);
  const [photographerData, setPhotographerData] = useState([]);

  useEffect(() => {
    firestore()
      .collection('cities')
      .doc(data?.destinationId?.cityId)
      .onSnapshot(snapshot => {
        setLocationData({...snapshot.data()});
      });
    firestore()
      .collection('packages')
      .doc(data?.packageId)
      .onSnapshot(snapshot => {
        setPackageData({...snapshot.data()});
      });
    firestore()
      .collection('destinations')
      .doc(data?.destinationId?.destinationId)
      .onSnapshot(snapshot => {
        setViewDestinationData({...snapshot.data()});
      });
    firestore()
      .collection('users')
      .doc(data?.photographerId)
      .onSnapshot(snapshot => {
        setPhotographerData({...snapshot.data()});
      });
  }, [data]);
  const [cancelAlert, setCancelAlert] = useState(false);
  const [show, setShow] = useState(false);
  const bookingdate = data?.createdAt?.toDate().toLocaleDateString().split('/');
  const cancelBooking = () => {
    firestore().collection('bookings').doc(data?.id).update({
      bookingStatus: 'cancelled',
      cancelled: true,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <View>
      {status === 'onGoing' &&
        (show ? (
          <TouchableOpacity
            style={{
              marginLeft: 20,
              marginRight: 27,
              backgroundColor: Colors.white,
              borderRadius: 20,
              elevation: 4,
              marginVertical: 20,
            }}
            onPress={() => {
              setShow(!show);
            }}>
            <View
              style={{
                borderRadius: 20,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                paddingLeft: 15,
                paddingTop: 20,
              }}>
              <ProgressiveImage
                thumbnailSource={{
                  uri: `${locationData?.displayPhotoUrl}`,
                }}
                source={{uri: locationData?.displayPhotoUrl}}
                style={{
                  width: 126,
                  height: 102,
                  borderRadius: 10,
                  flex: 0.4,
                }}
                resizeMode="cover"
                borderRadius={11}
                elevation={10}
              />
              <View
                style={{
                  paddingLeft: 20,
                  display: 'flex',
                  justifyContent: 'space-between',
                  flex: 0.6,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    lineHeight: 22,
                    textTransform: 'capitalize',
                    color: '#000',
                    textTransform: 'capitalize',
                  }}>
                  {data?.destinationName.split(',')[0]},
                  <Text
                    style={{
                      fontSize: 15,
                      textTransform: 'uppercase',
                    }}>
                    {data?.destinationName.split(',')[1]}
                  </Text>
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingVertical: 5,
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 10, lineHeight: 22, color: '#000'}}>
                    Booked for:{' '}
                  </Text>
                  <TouchableOpacity onPress={() => {}}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: Colors.blue,
                        fontWeight: 'bold',
                      }}>
                      {data?.startDate}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 10, color: '#000'}}>Booked On: </Text>
                  <TouchableOpacity onPress={() => {}}>
                    <Text
                      style={{fontSize: 10, fontWeight: 'bold', color: '#000'}}>
                      {bookingdate[1]}/{bookingdate[0]}/{bookingdate[2]}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{position: 'absolute', right: 11, bottom: -10}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Location', {
                      data: {...viewDestinationData, ...locationData},
                      countryId: viewDestinationData?.country,
                      bookingAvailable: false,
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: 8,
                      color: Colors.blue,
                      fontWeight: 'bold',
                    }}>
                    View Destination
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: 15,
                marginTop: 20,
                marginRight: 13,
                marginBottom: data?.photographerAllocated ? 0 : 31,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: windowWidth < 390 ? 9 : 12, color: '#000'}}>
                  Photographer:{' '}
                </Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text
                    style={{
                      fontSize: windowWidth < 390 ? 9 : 12,
                      color: data?.photographerAllocated ? Colors.blue : 'red',
                      fontWeight: 'bold',
                    }}>
                    {data?.photographerAllocated
                      ? photographerData?.firstName
                        ? photographerData?.firstName +
                          ' ' +
                          photographerData?.lastName
                        : photographerData?.uid?.slice(2)
                      : 'To Be Assigned'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: windowWidth < 390 ? 9 : 12,
                    lineHeight: 22,
                    color: '#000',
                  }}>
                  Package:{' '}
                </Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text
                    style={{
                      fontSize: windowWidth < 390 ? 9 : 12,
                      color: Colors.blue,
                      fontWeight: 'bold',
                    }}>
                    {packageData?.numberOfPhotos} edited photos
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {data?.photographerAllocated && (
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginTop: 31,
                  marginBottom: 17,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRightWidth: 1,
                    borderRightColor: '#9a9999',
                    width: '30%',
                  }}
                  onPress={() => {
                    navigation.navigate('AddBooking', {
                      location: '',
                      event: '',
                      edit: true,
                      bookingId: data?.id,
                    });
                  }}>
                  <Icon
                    type="AntDesign"
                    name="edit"
                    size={20}
                    color={Colors.blue}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      fontFamily: 'Jost-Medium',
                      textAlign: 'center',
                      color: '#000',
                    }}>
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRightWidth: 1,
                    borderRightColor: '#9a9999',
                    width: '30%',
                  }}
                  onPress={() => {
                    let phoneNumber = '';
                    if (Platform.OS === 'android') {
                      phoneNumber = `tel:+${data?.photographerId}`;
                    } else {
                      phoneNumber = `telprompt:+${data?.photographerId}`;
                    }
                    Linking.openURL(phoneNumber);
                  }}>
                  <Icon
                    type="Ionicons"
                    name="call"
                    size={20}
                    color={Colors.blue}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      fontFamily: 'Jost-Medium',
                      textAlign: 'center',
                      color: '#000',
                    }}>
                    Call
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '30%',
                  }}
                  onPress={() => {
                    setCancelAlert(true);
                  }}>
                  <Icon type="Fontisto" name="close" size={20} color={'red'} />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      fontFamily: 'Jost-Medium',
                      textAlign: 'center',
                      color: 'red',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              marginLeft: 20,
              marginRight: 27,
              backgroundColor: Colors.white,
              paddingVertical: 18,
              paddingLeft: 14,
              borderRadius: 20,
              elevation: 4,
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
              marginVertical: 20,
            }}
            // disabled={true}
            onPress={() => {
              setShow(!show);
            }}>
            <ProgressiveImage
              thumbnailSource={{
                uri: `${locationData?.displayPhotoUrl}`,
              }}
              source={{uri: locationData?.displayPhotoUrl}}
              style={{
                width: 75,
                height: 84,
                borderRadius: 10,
                flex: 0.4,
                // resizeMode: 'contain',
              }}
              resizeMode="cover"
              borderRadius={10}
            />
            <View
              style={{
                paddingLeft: 10,
                display: 'flex',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  lineHeight: 22,
                  textTransform: 'capitalize',
                  color: '#000',
                }}>
                {data?.destinationName.split(',')[0]},
                <Text
                  style={{
                    textTransform: 'uppercase',
                  }}>
                  {data?.destinationName.split(',')[1]}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: Colors.blue,
                  fontWeight: 'bold',
                  lineHeight: 22,
                  color: '#000',
                }}>
                {data?.startDate}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    lineHeight: 22,
                    color: '#000',
                  }}>
                  Photographer:{' '}
                </Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: data?.photographerAllocated ? Colors.blue : 'red',
                      fontWeight: 'bold',
                    }}>
                    {data?.photographerAllocated
                      ? photographerData?.firstName
                        ? photographerData?.firstName +
                          ' ' +
                          photographerData?.lastName
                        : photographerData?.uid?.slice(2)
                      : 'To Be Assigned'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 10,
                      lineHeight: 22,
                      color: '#000',
                    }}>
                    Package:
                    <Text style={{color: '#000'}}>
                      {packageData?.numberOfPhotos} Edited photos
                    </Text>
                  </Text>
                </View>
                <TouchableOpacity
                  style={{position: 'absolute', right: 10, bottom: -2}}
                  onPress={() => {
                    setCancelAlert(!cancelAlert);
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: Colors.blue,
                      lineHeight: 22,
                    }}>
                    Cancel Booking
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      {status === 'completed' && (
        <View
          style={{
            marginLeft: 20,
            marginRight: 27,
            backgroundColor: Colors.white,
            paddingVertical: 18,
            paddingLeft: 14,
            borderRadius: 20,
            elevation: 4,
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            marginVertical: 20,
          }}>
          <ProgressiveImage
            thumbnailSource={{
              uri: `${locationData?.displayPhotoUrl}`,
            }}
            source={{uri: locationData?.displayPhotoUrl}}
            style={{width: 75, height: 84, borderRadius: 10, flex: 0.4}}
            resizeMode="cover"
            borderRadius={10}
          />
          <View
            style={{
              paddingLeft: 10,
              display: 'flex',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: windowWidth < 390 ? 13 : 16,
                fontWeight: 'bold',
                lineHeight: 22,
                textTransform: 'capitalize',
                color: '#000',
              }}>
              {data?.destinationName.split(',')[0]},
              <Text
                style={{
                  textTransform: 'uppercase',
                }}>
                {data?.destinationName.split(',')[1]}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: Colors.blue,
                fontWeight: 'bold',
                lineHeight: 22,
              }}>
              {data?.startDate}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 10, lineHeight: 22, color: '#000'}}>
                Photographer:{' '}
              </Text>
              <TouchableOpacity onPress={() => {}}>
                <Text
                  style={{
                    fontSize: 10,
                    color: data?.photographerAllocated ? Colors.blue : 'red',
                    fontWeight: 'bold',
                  }}>
                  {data?.photographerAllocated
                    ? photographerData?.firstName
                      ? photographerData?.firstName +
                        ' ' +
                        photographerData?.lastName
                      : photographerData?.uid?.slice(2)
                    : 'To Be Assigned'}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 10,
                    lineHeight: 22,
                    color: '#000',
                  }}>
                  Package:
                  <Text style={{color: '#000'}}>
                    {packageData?.numberOfPhotos} Edited photos
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                style={{position: 'absolute', right: 10, bottom: -2}}
                disabled={!data?.photosUploaded}
                onPress={() => {
                  navigation.navigate('Photos', {
                    name: data?.destinationName,
                  });
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: data?.photosUploaded ? Colors.blue : 'red',
                    lineHeight: 22,
                  }}>
                  {data?.photosUploaded
                    ? 'View Photos'
                    : 'Yet to upload photos'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <Modal
        isVisible={cancelAlert}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={500}
        animationOutTiming={500}
        backdropColor="rgba(0,0,0,0.5)"
        onBackdropPress={() => {
          setCancelAlert(!cancelAlert);
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 35,
            paddingBottom: 35,
          }}>
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              fontSize: windowWidth < 390 ? 14 : 19,
              paddingLeft: 18,
              paddingRight: 13,
              lineHeight: 28,
            }}>
            Are you sure you want to cancel your upcoming booking for{' '}
            <Text
              style={{
                textTransform: 'uppercase',
                color: '#000',
                fontWeight: 'bold',
              }}>
              {data?.destinationName.split(',')[0]}?
            </Text>
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 11,
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#000',
                paddingHorizontal: 48,
                paddingVertical: 9,
                width: 121,
                marginRight: 24,
              }}
              onPress={() => {
                setCancelAlert(!cancelAlert);
              }}>
              <Text
                style={{
                  color: '#000',
                  textAlign: 'center',
                  fontSize: windowWidth < 390 ? 10 : 15,
                  flexWrap: 'nowrap',
                }}>
                NO
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'red',
                paddingHorizontal: 15,
                paddingVertical: 9,
                width: 124,
                marginRight: 15,
              }}
              onPress={() => {
                setCancelAlert(!cancelAlert);
                cancelBooking();
              }}>
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  fontSize: windowWidth < 390 ? 10 : 15,
                }}>
                YES, CANCEL
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({});
