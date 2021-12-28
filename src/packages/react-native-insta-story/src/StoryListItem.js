import React, {useState, useEffect, useRef} from 'react';
import {
    Animated,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    ActivityIndicator,
    View,
    Platform,
    ToastAndroid,
    Share,
} from "react-native";
import {usePrevious} from "./helpers/StateHelpers";
import {isNullOrWhitespace} from "./helpers/ValidationHelpers";
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MI from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modalbox";
import SwipeUpIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-community/clipboard';
const {width, height} = Dimensions.get('window');



export const StoryListItem = (props) => {
    const stories = props.stories;
    const [load, setLoad] = useState(true);
    const [pressed, setPressed] = useState(false);
    const [content, setContent] = useState(
        stories.map((x) => {
            return {
                image: x.url,
                onPress: x.onPress,
                finish: 0
            }
        }));

    const [current, setCurrent] = useState(0);

    const progress = useRef(new Animated.Value(0)).current;
    const copyToClipboard = text => {
        Clipboard.setString(text);
        ToastAndroid.show('URL copied', ToastAndroid.SHORT);
        startAnimation();
                                setIsModalOpen(false)
                                setPressed(false);
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
            //   startAnimation();
            //   setIsModalOpen(false)
            //   setPressed(false);
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
           
          }

        } catch (error) {
          alert(error.message);
        }

      };
    
    useEffect(() => {
        setCurrent(0);
        if (props.currentPage != 0) {
            let data = [...content];
            data.map((x, i) => {
                x.finish = 0;
            })
            setContent(data)
            start();
        }
    }, [props.currentPage]);

    const prevCurrent = usePrevious(current);
const [isModalOpen,setIsModalOpen] = useState(false);
    useEffect(() => {
        if (!isNullOrWhitespace(prevCurrent)) {
            if (current > prevCurrent && content[current - 1].image == content[current].image) {
                start();
            } else if (current < prevCurrent && content[current + 1].image == content[current].image) {
                start();
            }
        }

    }, [current]);

    function start() {
        setLoad(false);
        progress.setValue(0);
        startAnimation();
    }

    function startAnimation() {
        Animated.timing(progress, {
            toValue: 1,
            duration: props.duration,
            useNativeDriver: false
        }).start(({finished}) => {
            if (finished) {
                next();
            }
        });
    }

    function onReadMore() {
        // if (props.onClosePress) {
        //     props.onClosePress();
        // }
        // if (content[current].onPress) {
        //     content[current].onPress();
        // }
        console.log("hitesh")
        setIsModalOpen(true);
        progress.stopAnimation()
        setPressed(true);
    }

    function onSwipeDown() {
        props?.onClosePress();
    }

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    function next() {
        // check if the next content is not empty
        setLoad(true);
        if (current !== content.length - 1) {
            let data = [...content];
            data[current].finish = 1;
            setContent(data);
            setCurrent(current + 1);
            progress.setValue(0);
        } else {
            // the next content is empty
            close('next');
        }
    }

    function previous() {
        // checking if the previous content is not empty
        setLoad(true);
        if (current - 1 >= 0) {
            let data = [...content];
            data[current].finish = 0;
            setContent(data);
            setCurrent(current - 1);
            progress.setValue(0);
        } else {
            // the previous content is empty
            close('previous');
        }
    }

    function close(state) {
        let data = [...content];
        data.map(x => x.finish = 0);
        setContent(data);
        progress.setValue(0);
        if (props.currentPage == props.index) {
            if (props.onFinish) {
                props.onFinish(state);
            }
        }
    }

    return (
        <GestureRecognizer
            onSwipeUp={(state) => onSwipeUp(state)}
            onSwipeDown={(state) => onSwipeDown(state)}
            config={config}
            style={{
                flex: 1,
                backgroundColor: 'black'
            }}
        >
            <View style={styles.backgroundContainer}>
                <Image onLoadEnd={() => start()}
                       source={{uri: content[current].image}}
                       style={styles.image}
                />
                {load && <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color={'white'}/>
                </View>}
            </View>
            <View style={{flexDirection: 'column', flex: 1,}}>
                <View style={styles.animationBarContainer}>
                    {content.map((index, key) => {
                        return (
                            <View key={key} style={styles.animationBackground}>
                                <Animated.View
                                    style={{
                                        flex: current == key ? progress : content[key].finish,
                                        height: 2,
                                        backgroundColor: 'white',
                                    }}
                                />
                            </View>
                        );
                    })}
                </View>
                <View style={styles.userContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.avatarImage}
                               source={{uri: props.profileImage}}
                        />
                        <Text style={styles.avatarText}>{props.profileName}</Text>
                    </View>
                   
                        <View style={styles.closeIconContainer}>
                            {props.customCloseComponent ?
                                props.customCloseComponent :( <View style={styles.right}>
                                    <TouchableOpacity>
                                      <MI
                                        name="more-horiz"
                                        color="white"
                                        size={25}
                                        style={{marginRight: 14}}
                                      />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={props.onClosePress}>
                                      <Icon
                                        name="close"
                                        color="white"
                                        size={25}
                                        // style={{marginRight: 20}}
                                      />
                                    </TouchableOpacity>
                                  </View>)
                            }
                        </View>
                   
                </View>
                <View style={styles.pressContainer}>
                    <TouchableWithoutFeedback
                        onPressIn={() => progress.stopAnimation()}
                        onLongPress={() => setPressed(true)}
                        onPressOut={() => {
                            setPressed(false);
                            startAnimation();
                        }}
                        onPress={() => {
                            if (!pressed && !load) {
                                previous()
                            }
                        }}
                    >
                        <View style={{flex: 1}}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPressIn={() => progress.stopAnimation()}
                                              onLongPress={() => setPressed(true)}
                                              onPressOut={() => {
                                                  setPressed(false);
                                                  startAnimation();
                                              }}
                                              onPress={() => {
                                                  if (!pressed && !load) {
                                                      next()
                                                  }
                                              }}>
                        <View style={{flex: 1}}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <TouchableOpacity
                    onPress={onReadMore}
                    style={styles.readMoreWrapper}>
                    <View style={styles.readMore}>
                      <SwipeUpIcon
                        name="chevron-triple-up"
                        size={30}
                        color="white"
                      />
                    </View>
                    <Text style={styles.readText}>See More</Text>
                  </TouchableOpacity>
            <Modal
                style={{
                    position: 'absolute',
                    bottom:0,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    margin: 0,
                    height: height,
                    borderRadius: 20,
                backgroundColor:"transparent"
                }}
          isOpen={isModalOpen}
          backdropPressToClose={true}
                onClosed={() => {
                    startAnimation();
                    setIsModalOpen(false)
                    setPressed(false);

                }}
                position="center"
                swipeToClose
                swipeArea={250}
                backButtonClose
                coverScreen={true}
                backdropPressToClose={true}
            >
               <View
            style={{
              width: width,
              alignItems: 'center',
            }}>
            <View
              style={{
                width: width,
                backgroundColor: '#fff',
                borderRadius: 30,
                alignItems: 'center',
                marginTop: -20,
                            marginBottom: 60,
                // height:80
              }}>
              <View
                style={{
                  padding: 10,
                  borderBottomColor: '#000',
                  borderBottomWidth: 0.7,
                  width: width,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                <TouchableOpacity style={{width: width}}>
                  <Text
                    style={{textAlign: 'center', color: 'red', fontSize: 20}}>
                    Report
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 10,
                  borderBottomColor: '#000',
                  borderBottomWidth: 0.7,
                  width: width,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                <TouchableOpacity
                  onPress={() => copyToClipboard(content[current].image)}
                  style={{width: width}}>
                  <Text
                    style={{textAlign: 'center', color: '#000', fontSize: 20}}>
                    Copy Link
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 10,
                  width: width,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderBottomColor: '#000',
                  borderBottomWidth: 0.7,
                  marginBottom:10

                }}>
                <TouchableOpacity
                  onPress={() => {
                    onShare(content[current].image);
                  }}
                  style={{width: width}}>
                  <Text
                    style={{textAlign: 'center', color: '#000', fontSize: 20}}>
                    Share
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                padding: 10,
                width: width,
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: '#fff',
                borderRadius: 30,
                position: 'absolute',
                            bottom: 0,
                
              }}>
              <TouchableOpacity
                            onPress={() => {
                                startAnimation();
                                setIsModalOpen(false)
                                setPressed(false);
                }}
                style={{width: width}}>
                <Text
                  style={{textAlign: 'center', color: '#000', fontSize: 20}}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
            </Modal>
        </GestureRecognizer>
    )
}


export default StoryListItem;

StoryListItem.defaultProps = {
    duration: 10000
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    image: {
        width: width,
        height: height,
        resizeMode: 'cover'
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    spinnerContainer: {
        zIndex: -100,
        position: "absolute",
        justifyContent: 'center',
        backgroundColor: 'black',
        alignSelf: 'center',
        width: width,
        height: height,
    },
    animationBarContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    animationBackground: {
        height: 2,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(117, 117, 117, 0.5)',
        marginHorizontal: 2,
    },
    userContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    avatarImage: {
        height: 45,
        width: 45,
        borderRadius: 100
    },
    avatarText: {
        fontWeight: 'bold',
        color: 'white',
      paddingLeft: 10,
        textTransform: 'capitalize',
    },
    closeIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        // paddingHorizontal: 15,
    },
    pressContainer: {
        flex: 1,
        flexDirection: 'row'
    },

    right: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
justifyContent: 'flex-end',
    },
    readMore: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
      readText: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 12,
        color: 'white',
        marginTop: 8,
        textTransform: 'capitalize',
      },
      readMoreWrapper: {
        position: 'absolute',
        bottom: Platform.OS == 'ios' ? 20 : 50,
        width: '98%',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
});
