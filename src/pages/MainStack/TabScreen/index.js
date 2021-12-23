import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Dimensions, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-easy-icon';
import HomeScreen from '../HomeScreenStack/HomeScreen';
import ExploreScreen from '../ExploreScreenStack/ExploreScreen';
import BookingScreen from '../BookingScreenStack/BookingScreen';
import SettingScreen from '../SettingScreenStack/SettingScreen';
import {Colors} from '../../../colors';
import {InitialContext} from '../../../context';
import firestore from '@react-native-firebase/firestore';
const windowWidth = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();
const TabScreen = props => {
  const {ready, user, isGuestUser} = useContext(InitialContext);
  const uid = user?._user?.uid;
  const [data, setData] = useState('');
  useEffect(() => {
    if (uid) {
      const subscribe = firestore()
        .collection('users')
        .doc(uid)
        .onSnapshot(doc => setData(doc.data()));
      return subscribe;
    }
  }, []);
  const [categories, setCategories] = useState([]);
  const [exploreScreenData, setExploreScreenData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [popularDestinationData, setPopularDestinationData] = useState([]);
  const [chatsId, setChatsId] = useState([]);
  const [bookingNotifications, setBookingNotifications] = useState();
  const [recommendedDestinationData, setRecommendedDestinationData] = useState(
    [],
  );
  const [AllStories, setAllStories] = useState([]);

  useEffect(() => {
    firestore()
      .collection('categories')
      .onSnapshot(snapshot =>
        setCategories(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))),
      );
    firestore()
      .collection('destinations')
      .onSnapshot(snapshot =>
        setExploreScreenData(
          snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})),
        ),
      );

    if (uid) {
      firestore()
        .collection('bookings')
        .where('createdBy', '==', uid)
        .onSnapshot(snapshot =>
          setBookingData(
            snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})),
          ),
        );
    }
    if (uid) {
      firestore()
        .collection('chats')
        .where('users', 'array-contains', uid)
        .onSnapshot(chatSnapshot => {
          setChatsId(
            chatSnapshot?.docs.map(chat => ({id: chat.id, data: chat.data()})),
          );
        });
    }
  }, []);
  useEffect(
    () =>
      firestore()
        .collection('stories')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot =>
          setAllStories(
            snapshot?.docs?.map(doc => ({id: doc.id, ...doc.data()})),
          ),
        ),
    [],
  );
  useEffect(() => {
    let newArray = bookingData.filter(function (el) {
      return el.bookingStatus !== 'cancelled';
    });
    let newArray1 = newArray.filter(function (el) {
      return el.notificationForUser === true;
    });
    setBookingNotifications(newArray1);
  }, [bookingData]);
  useEffect(() => {
    let data = [];
    exploreScreenData?.map((item, index) => {
      if (item?.isRecommended) {
        firestore()
          .collection('cities')
          .doc(item?.city)
          .onSnapshot(doc => {
            data.push({...item, ...doc.data()});
            setRecommendedDestinationData(data);
          });
      }
    });
  }, [exploreScreenData]);

  useEffect(() => {
    let data = [];
    exploreScreenData?.map((item, index) => {
      firestore()
        .collection('cities')
        .doc(item?.city)
        .onSnapshot(doc => {
          data.push({...item, ...doc.data()});
          setPopularDestinationData(data);
        });
    });
  }, [exploreScreenData]);
  return (
    <Tab.Navigator
      initialRouteName={
        props?.route?.params?.bookingScreen ? 'BookingScreen' : 'HomeScreen'
      }
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => (
        <MyTabBar {...props} bookingNotifications={bookingNotifications} />
      )}
      backBehavior={'none'}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        {props => (
          <HomeScreen
            {...props}
            data={data}
            isGuestUser={isGuestUser}
            categories={categories}
            exploreScreenData={exploreScreenData}
            recommendedDestinationData={recommendedDestinationData}
            chatsId={chatsId}
            uid={uid}
            AllStories={AllStories}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="ExploreScreen"
        options={{
          tabBarLabel: 'Explore',
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        {props => (
          <ExploreScreen
            {...props}
            data={data}
            isGuestUser={isGuestUser}
            exploreScreenData={exploreScreenData}
            popularDestinationData={popularDestinationData}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="BookingScreen"
        options={{
          tabBarLabel: 'Booking',
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        {props => (
          <BookingScreen
            {...props}
            data={data}
            isGuestUser={isGuestUser}
            bookingData={bookingData}
            bookingNotifications={bookingNotifications}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="SettingScreen"
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        {props => (
          <SettingScreen {...props} data={data} isGuestUser={isGuestUser} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabScreen;

function MyTabBar({navigation, bookingNotifications, ...props}) {
  const iconList = [
    {
      icon: 'home',
      type: 'Entypo',
      route: 'HomeScreen',
    },
    {
      icon: 'compass-outline',
      type: 'ionicon',
      route: 'ExploreScreen',
    },

    {
      icon: 'camera',
      type: 'feather',
      route: 'BookingScreen',
    },
    {
      icon: 'setting',
      type: 'antdesign',
      route: 'SettingScreen',
    },
  ];

  const {state} = props;
  return (
    <View
      style={{
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        overflow: 'hidden',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#fff',
        elevation: 15,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 1.4,
        shadowRadius: 10,
      }}>
      {iconList.map((data, index) => (
        <TouchableOpacity
          key={`data${index}`}
          accessibilityRole="button"
          onPress={() => navigation.navigate(data.route)}
          style={{
            width: windowWidth / 4,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            type={data.type}
            name={data.icon}
            color={state.index === index ? Colors.blue : Colors.gray}
            size={23}
          />
          {bookingNotifications?.length > 0 && index === 2 && (
            <Text
              style={{
                backgroundColor: Colors.blue,
                width: 18,
                height: 18,
                position: 'absolute',
                top: 10,
                right: 35,
                textAlign: 'center',
                borderRadius: 50,
                color: Colors.white,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              {bookingNotifications?.length}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}
