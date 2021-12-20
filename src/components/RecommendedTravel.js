import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../colors';
import Icon from 'react-native-easy-icon';
import LinearGradient from 'react-native-linear-gradient';
import ProgressiveImage from './ProgressiveImage';
export default function RecommendedTravel({
  RecommendedDestination,
  navigation,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Location', {
          data: RecommendedDestination,
          countryId: RecommendedDestination?.country,
        });
      }}
      style={{postion: 'relative', marginLeft: 20}}>
      <ProgressiveImage
        thumbnailSource={{
          uri: RecommendedDestination?.displayPhotoUrl,
        }}
        source={{uri: RecommendedDestination?.displayPhotoUrl}}
        style={{
          width: 149,
          height: 181,
          borderRadius: 11,
        }}
        resizeMode="cover"
        borderRadius={11}
      />
     
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        locations={[0, 0.5, 0.9]}
        colors={[
          'rgba(128,128,128,0.2)',
          'rgba(128,128,128,0.1)',
          'transparent',
        ]}
        style={{
          width: 149,
          borderRadius: 11,
          position: 'absolute',
          top: 9,
          left: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            type="entypo"
            name="location-pin"
            size={25}
            color={Colors.white}
          />
          <Text
            style={{
              fontSize: 17,
              fontFamily: 'Jost-Regular',
              color: Colors.white,
              lineHeight: 20,
              fontWeight: '500',
              textTransform: 'capitalize',
            }}>
            {RecommendedDestination.cityName}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  blurView: {
    height: 70,
    width: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'absolute',
    backgroundColor: '#6D6D6D',
    bottom: 0,
  },
  card: {
    borderColor: '#6D6D6D',
    height: 50,
    width: '100%',
  },
});
