import React from 'react';
import {StyleSheet, Text, View, Image, Animated} from 'react-native';

const ProgressiveImage = props => {
  const {thumbnailSource, source, style} = props;
  const thumbnailAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);
  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const handleImageLoad = () => {
    Animated.timing(imageAnimated, {toValue: 1, useNativeDriver: true}).start();
  };
  const styles = StyleSheet.create({
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    container: {
      backgroundColor: '#fff',
      borderRadius: props.borderRadius,
      marginLeft: props.marginLeft,
      elevation: props.elevation,
    },
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        {...props}
        source={thumbnailSource}
        style={style}
        onLoad={handleThumbnailLoad}
        blurRadius={20}
      />
      <Animated.Image
        {...props}
        source={source}
        style={[styles.imageOverlay, style, {opacity: imageAnimated}]}
        onLoad={handleImageLoad}
      />
    </View>
  );
};

export default ProgressiveImage;
