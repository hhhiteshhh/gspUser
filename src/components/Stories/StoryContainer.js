import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ToastAndroid,
  Share,
} from 'react-native';
import Modal from 'react-native-modal';
import GestureRecognizer from 'react-native-swipe-gestures';
import Story from './Story';
import UserView from './UserView';
import Readmore from './Readmore';
import ProgressArray from './ProgressArray';
import Clipboard from '@react-native-community/clipboard';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

const SCREEN_WIDTH = Dimensions.get('window').width;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StoryContainer = props => {
  const {user, userUid, fetchSeenBy} = props;
  const {stories = []} = user || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModelOpen, setModel] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(3);
  const story = stories.length ? stories[currentIndex] : {};
  const {isReadMore, url} = story || {};
  const [copiedText, setCopiedText] = useState('');
  // const onVideoLoaded = (length) => {
  //   props.onVideoLoaded(length.duration);
  // };

  const copyToClipboard = text => {
    Clipboard.setString(text);
    ToastAndroid.show('URL copied', ToastAndroid.SHORT);
    onReadMoreClose();
  };
  const fetchCopiedText = async () => {
    const text = await clipboard.getString();
    setCopiedText(text);
  };

  const onShare = async text => {
    try {
      const result = await Share.share({
        message: text,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const changeStory = evt => {
    if (evt.locationX > SCREEN_WIDTH / 2) {
      nextStory();
    } else {
      prevStory();
    }
  };

  const nextStory = () => {
    if (stories.length - 1 == currentIndex) {
      firestore()
        .collection('stories')
        .doc(user.uid)
        .collection('seenBy')
        .doc(userUid)
        .set({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: userUid,
        });
      setCurrentIndex(0);
      props.onStoryNext();
    }
    if (stories.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
      setLoaded(false);
      setDuration(3);
    } else {
      setCurrentIndex(0);
      props.onStoryNext();
    }
  };

  const prevStory = () => {
    if (currentIndex > 0 && stories.length) {
      setCurrentIndex(currentIndex - 1);
      setLoaded(false);
      setDuration(3);
    } else {
      setCurrentIndex(0);
      props.onStoryPrevious();
    }
  };

  const onImageLoaded = () => {
    setLoaded(true);
  };

  const onVideoLoaded = length => {
    setLoaded(true);
    setDuration(length.duration);
  };

  const onPause = result => {
    setIsPause(result);
  };

  const onReadMoreOpen = () => {
    setIsPause(true);
    setModel(true);
  };
  const onReadMoreClose = () => {
    setIsPause(false);
    setModel(false);
  };

  const loading = () => {
    if (!isLoaded) {
      return (
        <View style={styles.loading}>
          <View style={{width: 1, height: 1}}>
            <Story
              onImageLoaded={onImageLoaded}
              pause
              onVideoLoaded={onVideoLoaded}
              story={story}
            />
          </View>
          <ActivityIndicator color="#0defef" />
        </View>
      );
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const onSwipeDown = () => {
    if (!isModelOpen) {
      props.onClose();
    } else {
      setModel(false);
    }
  };

  const onSwipeUp = () => {
    if (!isModelOpen && isReadMore) {
      setModel(true);
    }
  };

  return (
    <GestureRecognizer
      onSwipeDown={onSwipeDown}
      onSwipeUp={onSwipeUp}
      config={config}
      style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        delayLongPress={500}
        onPress={e => changeStory(e.nativeEvent)}
        onLongPress={() => onPause(true)}
        onPressOut={() => onPause(false)}
        style={styles.container}>
        <View style={styles.container}>
          <Story
            onImageLoaded={onImageLoaded}
            pause={isPause}
            isNewStory={props.isNewStory}
            onVideoLoaded={onVideoLoaded}
            story={story}
          />
          {loading()}
          <UserView
            name={user.title}
            profile={user.thumbnail}
            onClosePress={props.onClose}
          />
          <Readmore onReadMore={onReadMoreOpen} />
          <ProgressArray
            next={nextStory}
            isLoaded={isLoaded}
            duration={duration}
            pause={isPause}
            isNewStory={props.isNewStory}
            stories={stories}
            currentIndex={currentIndex}
            currentStory={stories[currentIndex]}
            length={stories.map((_, i) => i)}
            progress={{id: currentIndex}}
          />
        </View>

        <Modal
          isVisible={isModelOpen}
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            margin: 0,
            height: windowHeight * 0.5,
          }}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          animationInTiming={500}
          animationOutTiming={500}
          backdropColor="rgba(0,0,0,0.7)"
          onBackdropPress={() => {
            onReadMoreClose();
          }}>
          <View
            style={{
              width: windowWidth,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: windowWidth,
                backgroundColor: 'gray',
                borderRadius: 30,
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 70,
              }}>
              <View
                style={{
                  padding: 13,
                  borderBottomColor: '#fff',
                  borderBottomWidth: 1,
                  width: windowWidth,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                <TouchableOpacity>
                  <Text
                    style={{textAlign: 'center', color: 'red', fontSize: 20}}>
                    Report
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 13,
                  borderBottomColor: '#fff',
                  borderBottomWidth: 1,
                  width: windowWidth,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                <TouchableOpacity onPress={() => copyToClipboard(story?.url)}>
                  <Text
                    style={{textAlign: 'center', color: '#fff', fontSize: 20}}>
                    Copy Link
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 13,
                  width: windowWidth,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    onShare(story?.url);
                  }}>
                  <Text
                    style={{textAlign: 'center', color: '#fff', fontSize: 20}}>
                    Share
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                padding: 13,
                width: windowWidth,
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: 'gray',
                borderRadius: 30,
                position: 'absolute',
                bottom: 2,
              }}>
              <TouchableOpacity onPress={onReadMoreClose}>
                <Text
                  style={{textAlign: 'center', color: '#fff', fontSize: 20}}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  progressBarArray: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    width: '98%',
    height: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 55,
    width: '98%',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 3,
    marginLeft: 12,
    color: 'white',
  },
  content: {width: '100%', height: '100%'},
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: windowWidth,
    height: windowHeight * 0.25,
    backgroundColor: 'gray',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },
  bar: {
    width: 50,
    height: 8,
    backgroundColor: 'gray',
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: 8,
  },
});

export default StoryContainer;
