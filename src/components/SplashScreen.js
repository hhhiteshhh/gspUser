import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-easy-icon';
import StatusBarComponent from './StatusBarComponent';
import * as Animatable from 'react-native-animatable';
const SplashScreen = () => {
  const [zoomOutVisible, setZoomOutVisible] = useState(false);
  const [iconAnimation, setIconAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setZoomOutVisible(true);
    }, 1200);
    setTimeout(() => {
      setIconAnimation(true);
    }, 2100);
  }, []);

  const zoomOut = {
    0: {
      opacity: 0,
      scale: 0,
    },
    0.3: {
      opacity: 0.3,
      scale: 30,
    },

    0.5: {
      opacity: 0.5,
      scale: 50,
    },
    0.8: {
      opacity: 0.8,
      scale: 90,
    },
    1: {
      opacity: 1,
      scale: 150,
    },
  };

  return !zoomOutVisible ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
      }}>
      <StatusBarComponent backgroundColor={'white'} />
      <Animatable.Text
        style={{fontSize: 50, fontWeight: '700', color: '#000'}}
        animation="fadeIn">
        GetSn
      </Animatable.Text>
      <Animatable.View animation="fadeIn">
        <Icon type="feather" name="camera" size={45} color={'#000'} />
      </Animatable.View>
      <Animatable.Text
        style={{fontSize: 50, fontWeight: '700', color: '#000'}}
        animation="fadeIn">
        ppers
      </Animatable.Text>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
      }}>
      <StatusBarComponent backgroundColor={'white'} />

      {!iconAnimation && (
        <Animatable.Text
          style={{fontSize: 50, fontWeight: '700', color: '#000'}}
          animation="fadeOut">
          GetSn
        </Animatable.Text>
      )}
      {!iconAnimation ? (
        <View>
          <Icon type="feather" name="camera" size={45} color={'#000'} />
        </View>
      ) : (
        <Animatable.View animation={zoomOut}>
          <Icon type="feather" name="camera" size={45} color={'#000'} />
        </Animatable.View>
      )}
      {!iconAnimation && (
        <Animatable.Text
          style={{fontSize: 50, fontWeight: '700', color: '#000'}}
          animation="fadeOut">
          ppers
        </Animatable.Text>
      )}
    </View>
  );
};

export default SplashScreen;
