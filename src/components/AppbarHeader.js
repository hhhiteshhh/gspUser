import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {Colors} from '../colors';
const statusBarHeight = StatusBar.currentHeight;

const AppbarHeader = ({title}) => {
  return (
    <Text
      style={{
        color: Colors.white,
        fontFamily: 'Jost-SemiBold',
        fontSize: 22,
        marginTop: 1.5 * statusBarHeight,
        paddingLeft: 18,
      }}>
      {title}
    </Text>
  );
};

export default AppbarHeader;

const styles = StyleSheet.create({});
