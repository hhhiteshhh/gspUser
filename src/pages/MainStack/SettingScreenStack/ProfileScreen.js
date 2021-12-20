import React, {useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import profileBg from '../../../../assets/images/settingScreenImages/profileBackground.jpeg';
import {Colors} from '../../../colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-easy-icon';
import SettingsOptions from '../../../components/SettingsOptions';
import ProgressiveImage from '../../../components/ProgressiveImage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ProfileScreen = ({navigation, data}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <Text
          {...props}
          style={{
            color: Colors.blackLogoText,
            fontFamily: 'Jost-SemiBold',
            fontSize: 22,
            lineHeight: 26.4,
            fontWeight: '700',
            marginLeft: -17,
            padding: 0,
            textTransform: 'capitalize',
          }}>
          Profile
        </Text>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 20, padding: 0}}
          onPress={() => navigation.goBack()}>
          <Icon type="Entypo" name="chevron-left" size={25} color={'#000'} />
        </TouchableOpacity>
      ),

      headerStyle: {
        backgroundColor: Colors.white,
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
      },
    });
  }, [navigation]);
  return (
    <View style={styles.root}>
      <ImageBackground source={profileBg} style={styles.image} blurRadius={7}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flex: 0.9,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Jost-SemiBold',
              color: Colors.white,
              lineHeight: 26,
              textTransform: 'capitalize',
            }}>
            {data?.firstName
              ? `${data?.firstName} ${data?.lastName}`
              : data?.phoneNumber?.slice(2)}
          </Text>

          <ProgressiveImage
            thumbnailSource={{
              uri:
                data?.displayPictureUrl ||
                'https://firebasestorage.googleapis.com/v0/b/getsnappers-b188f.appspot.com/o/avatar.jpg?alt=media&token=2271a542-fe3b-4ef8-b970-294dd29198ad',
            }}
            source={{
              uri:
                data?.displayPictureUrl ||
                'https://firebasestorage.googleapis.com/v0/b/getsnappers-b188f.appspot.com/o/avatar.jpg?alt=media&token=2271a542-fe3b-4ef8-b970-294dd29198ad',
            }}
            style={{
              width: 216,
              height: 216,
              borderRadius: 200,
              opacity: 4,
            }}
            resizeMode="cover"
            borderRadius={200}
            elevation={4}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('AboutScreen')}
            style={{ marginTop: 8 }}
          >
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#0ee2e2', '#10bef4']}
              style={{
                borderRadius: 10,
                elevation: 4,
                padding: 6,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <Icon type="feather" name="edit" color={Colors.white} size={18} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <SettingsOptions
        title={'About'}
        type="antdesign"
        name="info"
        color={Colors.blue}
        size={25}
        navigation={navigation}
        goToScreen=""
      />
      <SettingsOptions
        title={'Rate App'}
        type="feather"
        name="star"
        color={Colors.blue}
        size={25}
        navigation={navigation}
        goToScreen=""
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    height: windowHeight,
    overflow: 'hidden',
  },
  inputView: {},
  image: {
    flex: windowWidth < 390 ? 0.7 : 0.5,
    resizeMode: 'cover',
    width: windowWidth,
    height: '100%',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
