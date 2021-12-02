import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitialContext = React.createContext();

const InitialProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isGuestUser, setGuestUser] = useState(false);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (isLoading) setLoading(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    checkGuestUser();
  }, [isGuestUser, user]);
  const checkGuestUser = async () => {
    try {
      const isGuestUser = await AsyncStorage.getItem('@isGuestUser');
      if (isGuestUser !== null) {
        setGuestUser(isGuestUser);
      }
    } catch (error) {

    }
  };
  const toggleMain = () => {
    setTimeout(() => {
      setReady(true);
    }, 3000);
  };

  const updateUser = () => {
    setUser(true);
    setGuestUser(true);
  };

  const signOut = async () => {
    try {
      if (auth()._user !== null) {
        await auth().signOut();
      }
      await AsyncStorage.setItem('@isGuestUser', JSON.stringify(false));
      setGuestUser(false);
      setUser(false);
    } catch (err) {
      console.log('err ', err);
    }
  };

  useEffect(() => {
    toggleMain();
  }, []);
  return (
    <InitialContext.Provider
      value={{
        ready: ready,
        user: user,
        updateUser: updateUser,
        signOut: signOut,
        isGuestUser: isGuestUser,
        setGuestUser,
      }}>
      {children}
    </InitialContext.Provider>
  );
};

export {InitialContext, InitialProvider};
