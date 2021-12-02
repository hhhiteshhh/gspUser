/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

// import Video from 'react-native-video';
// import Image from 'react-native-scalable-image';

const ScreenWidth = Dimensions.get('window').width;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Story = props => {
  const {story} = props;
  const {url, type} = story || {};

  return (
    <View style={styles.container}>
      {type === 'image' ? (
        <FastImage
          source={{uri: url}}
          onLoadEnd={props.onImageLoaded}
          style={styles.content}
          resizeMode="stretch"
          width={ScreenWidth}
        />
      ) : (
        // <Video
        //   source={{ uri: url }}
        //   paused={props.pause || props.isNewStory}
        //   onLoad={item => props.onVideoLoaded(item)}
        //   style={styles.content}
        // />
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#40546C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {width: windowWidth, height: windowHeight, flex: 1},
  imageContent: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Story;
