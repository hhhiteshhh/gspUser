import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Colors} from '../../../colors';
import settingScreenBg from '../../../../assets/images/settingScreenImages/settingFinal.png';
import SettingsOptions from '../../../components/SettingsOptions';
import StatusBarComponent from '../../../components/StatusBarComponent';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;

export default function SettingScreen({navigation, isGuestUser}) {
  return (
    <ImageBackground source={settingScreenBg} style={styles.image}>
      <StatusBarComponent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <Text
        style={{
          fontWeight: '700',
          fontSize: 22,
          lineHeight: 32,
          marginTop: 2 * statusBarHeight,
          marginBottom: statusBarHeight,
          color: Colors.white,
          fontFamily: 'Jost-Medium',
          marginLeft: 18,
        }}>
        Settings
      </Text>
      <View style={{display: 'flex', justifyContent: 'space-between', flex: 1}}>
        {isGuestUser !== 'true' && (
          <View>
            <SettingsOptions
              title={'Profile'}
              type="feather"
              name="user"
              color={Colors.blue}
              size={18}
              navigation={navigation}
              goToScreen="ProfileScreen"
            />
            <SettingsOptions
              title={'Support'}
              type="feather"
              name="tool"
              color={Colors.blue}
              size={18}
              navigation={navigation}
              goToScreen=""
            />
            <SettingsOptions
              title={'Privacy Policy'}
              type="materialcommunityicons"
              name="lock-outline"
              color={Colors.blue}
              size={18}
              navigation={navigation}
              goToScreen=""
            />
            <SettingsOptions
              title={'Cancellation Policy'}
              type="feather"
              name="file"
              color={Colors.blue}
              size={18}
              navigation={navigation}
              goToScreen=""
            />
          </View>
        )}

        <View style={{marginBottom: 10}}>
          <SettingsOptions
            title={'Log Out'}
            type="materialcommunityicons"
            name="logout"
            color={Colors.blue}
            size={18}
            navigation={navigation}
            signOutParam
          />
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  root: {
    height: windowHeight,
    marginTop: statusBarHeight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: windowWidth,
    height: windowHeight,
    display: 'flex',
    position: 'relative',
  },
});
