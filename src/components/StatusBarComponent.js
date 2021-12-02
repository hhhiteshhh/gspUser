import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';

const StatusBarComponent = ({
  backgroundColor = 'transparent',
  barStyle = 'dark-content',
}) => {
  return (
    <StatusBar
      translucent
      backgroundColor={backgroundColor}
      barStyle={barStyle}
    />
  );
};

export default StatusBarComponent;

const styles = StyleSheet.create({});
