import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import loginNoticeBg from '../../../../assets/images/authScreenImages/loginNotice.jpeg';
import StatusBarComponent from '../../../components/StatusBarComponent';
import {Colors} from '../../../colors';
import LinearGradient from 'react-native-linear-gradient';
import {InitialContext} from '../../../context';
import Icon from 'react-native-easy-icon';
const windowWidth = Dimensions.get('window').width;
const statusBarHeight = StatusBar.currentHeight;

const LoginNotice = ({navigation}) => {
  const {signOut} = useContext(InitialContext);
  const handleSignOut = () => {
    signOut();
  };

  return (
    <ImageBackground
      source={loginNoticeBg}
      style={styles.image}
      blurRadius={15}>
      <StatusBarComponent />
      <View
        style={{
          position: 'absolute',
          top: statusBarHeight * 1.25,
          width: windowWidth,
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 999,
        }}>
        <TouchableOpacity
          style={{marginLeft: 20, padding: 0}}
          onPress={() => navigation.goBack()}>
          <Icon type="Entypo" name="chevron-left" size={25} color={'#000'} />
        </TouchableOpacity>
      </View>
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
          onPress={() => {
            handleSignOut();
          }}>
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
    </ImageBackground>
  );
};

export default LoginNotice;

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
