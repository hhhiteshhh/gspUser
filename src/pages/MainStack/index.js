import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import Location from './HomeScreenStack/Location';
import RedirectingPage from './HomeScreenStack/RedirectingPage';
import BrowseCategories from './HomeScreenStack/BrowseCategories';
import {InitialContext} from '../../context';
import ChooseCategory from './BookingScreenStack/ChooseCategory';
import SelectCity from './HomeScreenStack/SelectCity';
import AddBooking from './HomeScreenStack/AddBooking';
import PaymentConfirm from './HomeScreenStack/PaymentConfirm';
import LoginNotice from './HomeScreenStack/LoginNotice';
import CategoryPage from './HomeScreenStack/CategoryPage';
import ProfileScreen from './SettingScreenStack/ProfileScreen';
import AboutScreen from './SettingScreenStack/AboutScreen';
import TabScreen from './TabScreen';
import ChangesUpdationScreen from './BookingScreenStack/ChangesUpdationScreen';
import Photos from './BookingScreenStack/Photos';
import ChatScreen from './HomeScreenStack/ChatScreen';
import ChatRoom from './HomeScreenStack/ChatRoom';

const Stack = createStackNavigator();
function MainStack({props}) {
  const {ready, user, isGuestUser} = useContext(InitialContext);
  const uid = user?._user?.uid;
  const [data, setData] = useState('');
  const [categories, setCategories] = useState('');
  const [exploreScreenData, setExploreScreenData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [chatsId, setChatsId] = useState([]);
  const [packageData, setPackageData] = useState([]);
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
    firestore()
      .collection('packages')
      .onSnapshot(snapshot =>
        setPackageData(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))),
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
  }, [uid]);
  useEffect(() => {
    if (uid) {
      firestore()
        .collection('users')
        .doc(uid)
        .onSnapshot(doc => setData(doc.data()));
    }
  }, []);

  const [photographerStatus, setPhotographerStatus] = useState([]);
  const [noChatYetImage, setNoChatImage] = useState();
  useEffect(() => {
    const dummyArray = [];
    bookingData.forEach(booking => {
      dummyArray.push(booking.photographerAllocated);
      setPhotographerStatus(dummyArray);
    });
  }, [bookingData]);
  useEffect(() => {
    setNoChatImage(someComplete(photographerStatus));
  }, [photographerStatus, bookingData]);

  const someComplete = booking => booking?.some(v => v === true);
  const [destinationData, setDestinationData] = useState([]);

  useEffect(() => {
    let data = [];
    exploreScreenData?.map((item, index) => {
      firestore()
        .collection('cities')
        .doc(item?.city)
        .onSnapshot(doc => {
          data.push({...item, ...doc.data()});
          setDestinationData(data);
        });
    });
  }, [exploreScreenData]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" options={{headerShown: false}}>
        {props => <TabScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="BrowseCategories" options={{headerShown: true}}>
        {props => (
          <BrowseCategories
            {...props}
            data={data}
            isGuestUser={isGuestUser}
            categories={categories}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ChooseCategory">
        {props => (
          <ChooseCategory
            {...props}
            data={data}
            isGuestUser={isGuestUser}
            categories={categories}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="SelectCity">
        {props => (
          <SelectCity
            {...props}
            data={data}
            isGuestUser={isGuestUser}
            exploreScreenData={destinationData}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="AddBooking" options={{headerShown: false}}>
        {props => <AddBooking {...props} uid={uid} packageData={packageData} />}
      </Stack.Screen>
      <Stack.Screen
        name="RedirectingPage"
        component={RedirectingPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentConfirm"
        component={PaymentConfirm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginNotice"
        component={LoginNotice}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Location" options={{headerShown: false}}>
        {props => <Location {...props} isGuestUser={isGuestUser} />}
      </Stack.Screen>
      <Stack.Screen name="CategoryPage" options={{headerShown: false}}>
        {props => <CategoryPage {...props} isGuestUser={isGuestUser} />}
      </Stack.Screen>
      <Stack.Screen name="ProfileScreen" options={{headerShown: true}}>
        {props => <ProfileScreen {...props} data={data} />}
      </Stack.Screen>
      <Stack.Screen name="AboutScreen" options={{headerShown: true}}>
        {props => <AboutScreen {...props} data={data} />}
      </Stack.Screen>
      <Stack.Screen
        name="ChangesUpdationScreen"
        component={ChangesUpdationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Photos"
        component={Photos}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Chat" options={{headerShown: noChatYetImage}}>
        {props => (
          <ChatScreen
            {...props}
            data={data}
            bookingData={bookingData}
            chatData={chatsId}
            uid={uid}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="ChatRoom"
        options={{headerShown: true}}>
        {props => <ChatRoom {...props} data={data} uid={uid} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default MainStack;
