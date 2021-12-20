import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Colors} from '../colors';
import ProgressiveImage from './ProgressiveImage';

const PopularSpotsPicture = ({data, navigation, isGuestUser}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Location', {
            data: data,
            countryId: data?.country,
          });
        }}>
        <ProgressiveImage
          thumbnailSource={{
            uri: data.displayPhotoUrl,
          }}
          source={{uri: data.displayPhotoUrl}}
          style={{
            width: 325,
            height: 284,
            borderRadius: 20,
            // marginLeft: 20,
            borderWidth: 5,
            borderColor: Colors.white,
            // position: 'relative',
          }}
          resizeMode="cover"
          borderRadius={20}
          marginLeft={10}
          // elevation={1}
        />
       
        <View
          style={{
            position: 'absolute',
            top: 9,
            left: '35%',
            backgroundColor: Colors.white,
            borderRadius: 20,
            elevation: 4,
            width: 120,
            height: 30,
          }}>
          <Text
            style={{
              textAlign: 'center',
              width: 80,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 'auto',
              marginBottom: 'auto',
              fontSize: 16,
              lineHeight: 23,
              fontFamily: 'Jost-Regular',
              fontWeight: '400',
              color: '#000',
              textTransform: 'capitalize',
            }}>
            {data.cityName}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PopularSpotsPicture;

const styles = StyleSheet.create({});
