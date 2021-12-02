import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import ProgressiveImage from './ProgressiveImage';
const windowWidth = Dimensions.get('window').width;

const Destination = ({
  title,
  index,
  id,
  photos,
  image,
  photo,
  exploreResults,
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        paddingHorizontal: photo ? 10 : 8,
        paddingVertical: photo ? 10 : 8,
      }}>
      <ProgressiveImage
        thumbnailSource={{
          uri:
            image ||
            'https://firebasestorage.googleapis.com/v0/b/getsnappers-b188f.appspot.com/o/screen2.png?alt=media&token=f9daf3f1-a1a9-41f4-8ef1-4acba25b81be',
        }}
        source={{
          uri:
            image ||
            'https://firebasestorage.googleapis.com/v0/b/getsnappers-b188f.appspot.com/o/screen2.png?alt=media&token=f9daf3f1-a1a9-41f4-8ef1-4acba25b81be',
        }}
        style={{
          width: photo ? (windowWidth < 390 ? 90 : 110) : 92,
          height: photo ? (windowWidth < 390 ? 90 : 103) : 87,
          borderRadius: photo ? 10 : 25,
          overflow: 'hidden',
          opacity: 4,
          borderWidth: 2,
          borderColor: !photos && index == id ? '#0defef' : 'transparent',
          shadowColor: 'red',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 1,
          shadowRadius: 1.41,
        }}
        resizeMode="cover"
        borderRadius={photo ? 10 : 25}
        elevation={0}
      />

      {/* <FastImage
        source={{
          uri:
            image ||
            'https://firebasestorage.googleapis.com/v0/b/getsnappers-b188f.appspot.com/o/screen2.png?alt=media&token=f9daf3f1-a1a9-41f4-8ef1-4acba25b81be',
        }}
        resizeMode="cover"
        style={{
          width: photo ? (windowWidth < 390 ? 90 : 110) : 92,
          height: photo ? (windowWidth < 390 ? 90 : 103) : 87,
          borderRadius: photo ? 10 : 25,
          overflow: 'hidden',
          elevation: 4,
          opacity: 4,
          borderWidth: 2,
          borderColor: !photos && index == id ? '#0defef' : 'transparent',
        }}
      /> */}
      {title && (
        <Text
          style={{
            padding: 6,
            color: exploreResults ? '#fff' : '#000',
            textTransform: 'capitalize',
            fontSize: photo
              ? windowWidth < 390
                ? 10
                : 12
              : windowWidth < 390
              ? 12
              : 14,
          }}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default Destination;

const styles = StyleSheet.create({});
