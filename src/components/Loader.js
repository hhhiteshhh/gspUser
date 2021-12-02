import React from 'react';
import {View, ActivityIndicator} from 'react-native';
export default function Loader({size, color}) {
  return (
    <View>
      <ActivityIndicator size={size || 'small'} color={color || '#ffffff'} />
    </View>
  );
}
