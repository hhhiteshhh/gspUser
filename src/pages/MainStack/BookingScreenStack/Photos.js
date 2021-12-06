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
  const photos = ['', '', '', '', '', '', '', ''];
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
            marginTop: 1.5 * statusBarHeight,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <TouchableOpacity
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
              paddingLeft: 20,
              textTransform: 'capitalize',
            }}>
            {route.params.name.split(',')[0]},
            <Text
              style={{
                textTransform: 'uppercase',
              }}>
              {route.params.name.split(',')[1]}
            </Text>
          </Text>
        </View>
        <ScrollView
          style={{
            marginLeft: 15,
            marginRight: 15,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexWrap: 'wrap',
              flex: 0.3,
              flexDirection: 'row',
            }}>
            {photos.map(id => (
              <TouchableOpacity key={id}>
                <Destination id={id} photo />
              </TouchableOpacity>
            ))}
          </View>
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
