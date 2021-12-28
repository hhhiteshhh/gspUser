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
            type: data.type,
          });
        }}
        style={{paddingHorizontal: 10, overflow: 'hidden'}}>
        <View
          style={{
            borderRadius: 20,
            borderWidth: 5,
            borderColor: Colors.white,
            overflow: 'hidden',
          }}>
          <ProgressiveImage
            thumbnailSource={{
              uri: data.displayImages[0],
            }}
            source={{uri: data.displayImages[0]}}
            style={{
              width: 325,
              height: 284,
            }}
            resizeMode="cover"
            // borderRadius={20}
          />
        </View>
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
            {data.city}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PopularSpotsPicture;

const styles = StyleSheet.create({});
