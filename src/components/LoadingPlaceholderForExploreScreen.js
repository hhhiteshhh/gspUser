import React from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('screen').width;
const LoadingPlaceholderForExploreScreen = () => {
  return (
    <SkeletonPlaceholder
      speed={1300}
      style={{height: screenHeight / 2 + 20, width: screenWidth}}>
      <SkeletonPlaceholder.Item
        width={screenWidth / 2}
        height={20}
        marginLeft={25}
        marginRight={25}
      />
      <SkeletonPlaceholder.Item
        width={screenWidth / 1.25}
        height={20}
        marginLeft={25}
        marginRight={25}
        marginTop={10}
      />
      <SkeletonPlaceholder.Item
        width={screenWidth / 1.25}
        height={20}
        marginLeft={25}
        marginRight={25}
        marginTop={7}
      />
      <SkeletonPlaceholder.Item
        width={screenWidth / 1.25}
        height={20}
        marginLeft={25}
        marginRight={25}
        marginTop={7}
      />
      <SkeletonPlaceholder.Item
        width={screenWidth / 1.25}
        height={20}
        marginLeft={25}
        marginRight={25}
        marginTop={7}
      />
      <SkeletonPlaceholder.Item
        width={screenWidth / 2}
        height={20}
        marginLeft={25}
        marginRight={25}
        marginTop={15}
      />
      <SkeletonPlaceholder.Item
        width={screenWidth / 1.25}
        height={20}
        marginLeft={25}
        marginRight={25}
        marginTop={7}
      />
      <SkeletonPlaceholder.Item
        width={screenWidth / 1.25}
        height={20}
        marginLeft={25}
        marginRight={25}
        marginTop={7}
      />
      <SkeletonPlaceholder.Item
        width={screenWidth / 1.25}
        height={20}
        marginLeft={25}
        marginRight={25}
        marginTop={7}
      />
      <SkeletonPlaceholder.Item
        width={screenWidth / 2}
        height={20}
        marginLeft={25}
        marginRight={25}
        marginTop={15}
      />
    </SkeletonPlaceholder>
  );
};

export default LoadingPlaceholderForExploreScreen;
