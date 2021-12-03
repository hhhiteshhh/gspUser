import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Colors} from '../../../colors';
import addBookingBg from '../../../../assets/images/bookingScreenImages/dubai.jpeg';
import Icon from 'react-native-easy-icon';
import Group from '../../../../assets/images/bookingScreenImages/Group.png';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modal';
import StatusBarComponent from '../../../components/StatusBarComponent';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

const windowWidth = Dimensions.get('window').width;
const statusBarHeight = StatusBar.currentHeight;

const AddBooking = ({navigation, route, uid, packageData}) => {
  // console.log(packageData);
  const times = [
    '07AM-10AM',
    '10AM-01PM',
    '01PM-03PM',
    '03PM-06PM',
    '06PM-09PM',
  ];
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    let data = [];
    packageData.map(item => {
      if (route.params?.amount?.numberOfPhotos <= item?.numberOfPhotos) {
        data.push(item);
        setPackages(data);
      }
    });
  }, [packageData, route.params]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPackage, setSelectedPackage] = useState();
  const [timeSlot, setTimeSlot] = useState();
  const [timeIndex, setTimeIndex] = useState();
  const [selectedPackageIndex, setSelectedPackageIndex] = useState();
  const [changesAlert, setChangesAlert] = useState(false);
  const [countryName, setCountryName] = useState();
  // console.log({startDate});
  // console.log({endDate});
  // console.log(new Date());
  // console.log(route.params.event);
  // console.log(route.params.eventId);
  // console.log(route.params.cityName, countryName?.countryName);
  // console.log({selectedPackage});
  // console.log({timeSlot});
  // console.log(uid);
  // console.log(route.params.locationId);
  // console.log(route.params.cityName);

  useEffect(() => {
    firestore()
      .collection('countries')
      .doc(route?.params?.locationId?.countryId)
      .onSnapshot(doc => {
        setCountryName(doc.data());
      });
  }, [route?.params?.locationId?.countryId]);
  useEffect(() => {
    if (route?.params?.edit) {
      setChangesAlert(true);
      firestore()
        .collection('bookings')
        .doc(route?.params?.bookingId)
        .onSnapshot(snapshot => {
          setStartDate(snapshot.data().startDate);
          setEndDate(snapshot.data().endDate);
          setTimeSlot(snapshot.data().timeSlot);
        });
    }
  }, []);

  const editBooking = () => {
    if (!timeIndex) {
      ToastAndroid.show('All fields are mandatory', ToastAndroid.SHORT);
      return;
    }
    firestore().collection('bookings').doc(route.params.bookingId).update({
      time: timeSlot,
      startDate: startDate,
      endDate: endDate,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      urgent: true,
    });
    navigation.navigate('ChangesUpdationScreen');
  };
  const addBooking = () => {
    firestore()
      .collection('bookings')
      .add({
        startDate: startDate,
        endDate: endDate,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        categoryName: route.params.event || '',
        categoryId: route.params.eventId || '',
        destinationName: `${route.params.cityName}, ${countryName.countryName}`,
        destinationId: route.params.locationId,
        packageId: selectedPackage,
        timeSlot: timeSlot,
        photographerName: '',
        photographerId: '',
        createdBy: uid,
        photographerAllocated: false,
        photographerToBeAllocated: '',
        bookingStatus: 'onGoing',
        cancelled: false,
        notificationForPhotographer: false,
        notificationForUser: false,
        photosUploaded: false,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: uid,
      });

    navigation.navigate('RedirectingPage');
  };
  return (
    <ImageBackground source={addBookingBg} style={styles.image}>
      <StatusBarComponent />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 1.5 * statusBarHeight,
        }}>
        <TouchableOpacity
          style={{position: 'absolute', left: 20}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon type="antdesign" name="left" size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.white,
            fontFamily: 'Jost-SemiBold',
            fontSize: 24,
            fontWeight: '500',
            marginLeft: 55,
            lineHeight: 37,
          }}>
          Add Booking
        </Text>
      </View>
      <ScrollView
        style={styles.root}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 26,
            paddingVertical: 10,
            marginVertical: 30,
            backgroundColor: Colors.base,
            borderRadius: 20,
            width: 262,
          }}>
          <Text
            style={{
              color: Colors.blackLogoText,
              fontFamily: 'Jost-SemiBold',
              fontSize: 9,
              fontWeight: '500',
              textTransform: 'lowercase',
            }}>
            *please select start date first
          </Text>

          <Text
            style={{
              color: Colors.blackLogoText,
              fontFamily: 'Jost-SemiBold',
              fontSize: 16,
              fontWeight: '500',
            }}>
            From
          </Text>
          <DatePicker
            style={{width: '100%'}}
            date={startDate}
            mode="date"
            androidMode="spinner"
            placeholder="DD/MM/YYYY"
            format="DD/MM/YYYY"
            iconSource=""
            minDate={new Date()}
            customStyles={{
              dateInput: {
                marginLeft: 0,
                borderBottomColor: Colors.blue,
                borderBottomWidth: 1,
                borderWidth: 0,
                padding: 0,
              },
              dateText: {
                fontSize: 16,
                color: Colors.blackLogoText,
                textAlign: 'left',
                padding: 0,
                lineHeight: 23,
                marginLeft: -75,
              },
              placeholderText: {
                fontSize: 16,
                color: Colors.blackLogoText,
                textAlign: 'left',
                padding: 0,
                marginLeft: -60,
              },
            }}
            onDateChange={date => {
              setStartDate(date);
            }}
          />
          <Text
            style={{
              color: Colors.blackLogoText,
              fontFamily: 'Jost-SemiBold',
              fontSize: 16,
              fontWeight: '500',
              paddingTop: 10,
            }}>
            To
          </Text>

          <DatePicker
            style={{width: '100%'}}
            date={endDate}
            androidMode="spinner"
            mode="date"
            placeholder="DD/MM/YYYY"
            format="DD/MM/YYYY"
            disabled={!startDate}
            iconSource=""
            minDate={startDate}
            customStyles={{
              dateInput: {
                marginLeft: 0,
                borderBottomColor: Colors.blue,
                borderBottomWidth: 1,
                borderWidth: 0,
                padding: 0,
              },
              dateText: {
                fontSize: 16,
                color: Colors.blackLogoText,
                textAlign: 'left',
                padding: 0,
                marginLeft: -75,
              },
              placeholderText: {
                fontSize: 16,
                color: Colors.blackLogoText,
                textAlign: 'left',
                padding: 0,
                marginLeft: -60,
              },
            }}
            onDateChange={date => {
              setEndDate(date);
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: Colors.base,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
          }}>
          <Text
            style={{
              color: Colors.blackLogoText,
              fontFamily: 'Jost-Bold',
              fontSize: 16,
              fontWeight: '500',
              padding: 5,
            }}>
            Select Time
          </Text>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}>
            {times.map((time, index) => (
              <TouchableOpacity
                style={{
                  display: 'flex',
                  marginHorizontal: 7,
                  backgroundColor:
                    timeIndex === index ? Colors.blue : Colors.white,
                  borderRadius: 10,
                  marginVertical: 5,
                  elevation: 4,
                }}
                key={index}
                onPress={() => {
                  setTimeSlot(time), setTimeIndex(index);
                }}>
                <Text
                  style={{
                    paddingHorizontal: 30,
                    paddingVertical: 15,
                    textAlign: 'center',
                    color: timeIndex == index ? Colors.white : 'black',
                    fontSize: 12,
                  }}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {!route.params.edit && (
          <View
            style={{
              width: '100%',
              marginVertical: 30,
              backgroundColor: Colors.base,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
              width: 300,
            }}>
            <Text
              style={{
                color: Colors.blackLogoText,
                fontFamily: 'Jost-Bold',
                fontSize: 16,
                fontWeight: '500',
                padding: 5,
              }}>
              Select Package
            </Text>
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginBottom: 30,
              }}>
              {packages?.map((pckg, index) => (
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    marginHorizontal: 10,
                    backgroundColor: Colors.white,
                    borderRadius: 20,
                    marginVertical: 10,
                    borderWidth: 2,
                    borderColor:
                      selectedPackageIndex == index
                        ? Colors.blue
                        : Colors.white,
                    elevation: 4,
                    width: 110,
                    height: 119,
                  }}
                  key={index}
                  onPress={() => {
                    setSelectedPackage(pckg.id), setSelectedPackageIndex(index);
                  }}>
                  <FastImage
                    source={Group}
                    resizeMode="cover"
                    style={{
                      width: '60%',
                      height: 50,
                      resizeMode: 'contain',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      padding: 10,
                      marginTop: 10,
                      elevation: 4,
                    }}
                  />
                  <Text
                    style={{
                      paddingHorizontal: 30,
                      paddingVertical: 4,
                      textAlign: 'center',
                      color: Colors.blackLogoText,
                      fontWeight: '700',
                      fontSize: 14,
                      fontFamily: 'Jost-Bold',
                    }}>
                    {pckg?.numberOfPhotos}
                    {'\n'}
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: 'Jost-Medium',
                        fontWeight: '400',
                      }}>
                      Edited Pictures
                    </Text>
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        <TouchableOpacity
          style={{
            width: 182,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingBottom: 20,
            marginTop: route.params.edit ? 30 : 0,
          }}
          onPress={() => {
            if (route.params.edit) {
              editBooking();
            } else {
              if (startDate && endDate && timeSlot && selectedPackage) {
                // console.log('booking can be done');
                addBooking();
              } else {
                ToastAndroid.show(
                  'All fields are mandatory',
                  ToastAndroid.SHORT,
                );
              }
            }
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#0ee2e2', '#10bef4']}
            style={{borderRadius: 10}}>
            <Text
              style={{
                color: Colors.white,
                fontSize: 16,
                fontFamily: 'Jost-Medium',
                fontWeight: '600',
                marginLeft: 'auto',
                marginRight: 'auto',
                padding: 10,
              }}>
              {route.params.edit ? 'Confirm Changes' : 'Confirm & Pay'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

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
            You will have to wait for approval {'\n'}on any changes made to the
            {'\n'}
            booking details
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
  );
};

export default AddBooking;

const styles = StyleSheet.create({
  root: {marginLeft: 20, marginRight: 20},
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: windowWidth,
    display: 'flex',
    flexDirection: 'column',
  },
});
