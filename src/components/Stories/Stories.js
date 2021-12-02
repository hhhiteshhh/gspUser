import React, {useRef, useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CubeNavigationHorizontal} from 'react-native-3dcube-navigation';
import StoryContainer from './StoryContainer';
import firestore from '@react-native-firebase/firestore';
import ProgressiveImage from '../ProgressiveImage';

const Stories = ({AllStories}) => {
  const [isModelOpen, setModel] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const modalScroll = useRef(null);
  const onStorySelect = index => {
    setCurrentUserIndex(index);
    setModel(true);
  };
  const onStoryClose = () => {
    setModel(false);
  };

  const onStoryNext = isScroll => {
    const newIndex = currentUserIndex + 1;
    if (AllStories.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    } else {
      setModel(false);
    }
  };

  const onStoryPrevious = isScroll => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = scrollValue => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);

      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious();

      setCurrentScrollValue(scrollValue);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={AllStories}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.location}
        renderItem={({item, index}) => (
          <View
            key={index}
            style={{display: 'flex', alignItems: 'center', elevation: 6}}>
            <TouchableOpacity
              key={index}
              style={styles.container1}
              onPress={() => onStorySelect(index)}>
              {/* {loading ? (
                <ActivityIndicator style={styles.circle} color="#0defef" />
              ) : (
                <FastImage
                  onLoadEnd={() => {
                    setLoading(false);
                  }}
                  style={styles.circle}
                  source={{uri: item.displayPhotoUrl}}
                />
              )} */}
              <ProgressiveImage
                thumbnailSource={{
                  uri: item.thumbnail,
                }}
                source={{uri: item.thumbnail}}
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 40,
                  borderWidth: 0.5,
                  padding: 5,
                  borderColor: '#40546c',
                }}
                resizeMode="cover"
                borderRadius={40}
              />
            </TouchableOpacity>
            <Text
              style={{
                width: 70,
                textAlign: 'center',
                color: '#000',
                textTransform: 'capitalize',
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.title}
            </Text>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}>
        <CubeNavigationHorizontal
          callBackAfterSwipe={g => onScrollChange(g)}
          ref={modalScroll}
          style={styles.container}>
          {AllStories.map((item, index) => (
            <StoryContainer
              key={index}
              onClose={onStoryClose}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              user={item}
              isNewStory={index !== currentUserIndex}
            />
          ))}
        </CubeNavigationHorizontal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 4,
    marginLeft: 20,
  },
  circle: {
    width: 65,
    height: 65,
    borderRadius: 40,
    borderWidth: 0.5,
    padding: 5,
    borderColor: '#40546c',
  },
  modal: {
    flex: 1,
  },
  container1: {
    display: 'flex',
    alignItems: 'center',
    padding: 4,
    borderColor: '#0defef',
    borderWidth: 1.4,
    borderRadius: 50,
    margin: 4,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 1.41,
  },
});

export default Stories;
