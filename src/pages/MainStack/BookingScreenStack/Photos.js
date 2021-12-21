import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import Destination from '../../../components/Destination';
import StatusBarComponent from '../../../components/StatusBarComponent';
import photosScreenBg from '../../../../assets/images/bookingScreenImages/delhi.jpeg';
import {Colors} from '../../../colors';
import Icon from 'react-native-easy-icon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;

const Photos = ({navigation, route}) => {
  const photos = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];
  return (
    <View
      style={{
        width: '100%',
        height: windowHeight + statusBarHeight,
        overflow: 'hidden',
      }}>
      <ImageBackground
        source={photosScreenBg}
        style={styles.image}
        blurRadius={15}>
        <StatusBarComponent backgroundColor="transparent" />
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
            <Icon type="Entypo" name="chevron-left" size={25} color={'#fff'} />
          </TouchableOpacity>
          <Text
            style={{
              color: Colors.white,
              fontFamily: 'Jost-SemiBold',
              fontSize: 22,
              lineHeight: 26.4,
              fontWeight: '700',
              padding: 0,
              textTransform: 'capitalize',
            }}>
            {route.params.name.split(',')[0]}
            <Text
              style={{
                color: Colors.white,
                fontFamily: 'Jost-SemiBold',
                fontSize: 15,
                lineHeight: 26.4,
                fontWeight: '700',
                padding: 0,
                textTransform: 'uppercase',
              }}>
              {route.params.name.split(',')[1]}
            </Text>
          </Text>
        </View>
        <ScrollView
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: statusBarHeight * 1.25 + 35,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexWrap: 'wrap',
              flex: 0.3,
              flexDirection: 'row',
            }}>
            {photos.map((_,id) => (
              <TouchableOpacity key={id}>
                <Destination id={id} photo />
              </TouchableOpacity>
            ))}
          </View>
          <View style={{height: 50}} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Photos;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: windowWidth,
    height: windowHeight + statusBarHeight,
    display: 'flex',
    flexDirection: 'column',
  },
});
