import React from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('screen').width;
const LoadingPlaceHolder = () => {
  return (
    <SkeletonPlaceholder
      speed={1300}
      style={{height: screenHeight, width: screenWidth}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
          paddingLeft: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SkeletonPlaceholder.Item
            width={48}
            height={48}
            borderRadius={50}
            alignSelf="flex-start"
            top={28}
          />
          <SkeletonPlaceholder.Item
            width={240}
            height={20}
            alignSelf="center"
            marginTop={52}
            marginLeft={15}
          />
        </View>
        <SkeletonPlaceholder.Item
          width={25}
          height={25}
          borderRadius={50}
          marginRight={20}
          top={28}
        />
      </View>
      <SkeletonPlaceholder.Item
        width={250}
        height={25}
        marginLeft={25}
        marginTop={35}
      />
      <SkeletonPlaceholder.Item
        width={200}
        height={20}
        marginTop={20}
        marginLeft={25}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: 20,
        }}>
        {[1, 3, 4, 4].map((dt, i) => (
          <View
            key={dt - i}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 8,
              marginBottom: 10,
            }}>
            <SkeletonPlaceholder.Item
              key={dt - i}
              width={65}
              height={65}
              borderRadius={40}
              alignSelf="flex-start"
            />
            <SkeletonPlaceholder.Item width={45} height={10} marginTop={5} />
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
          paddingLeft: 20,
          // backgroundColor: '#fff',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SkeletonPlaceholder.Item width={25} height={25} marginTop={18} />
          <SkeletonPlaceholder.Item
            width={140}
            height={20}
            marginTop={18}
            marginLeft={15}
          />
        </View>
        <SkeletonPlaceholder.Item
          width={80}
          height={15}
          marginRight={20}
          marginTop={18}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: 10,
          marginRight: 20,
        }}>
        {[1, 3, 4].map((dt, i) => (
          <View
            key={dt - i}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // marginHorizontal: 8,
              marginBottom: 10,
            }}>
            <SkeletonPlaceholder.Item
              key={dt - i}
              width={101}
              height={80}
              borderRadius={11}
            />
            <SkeletonPlaceholder.Item width={75} height={20} marginTop={10} />
          </View>
        ))}
      </View>
      <SkeletonPlaceholder.Item
        width={240}
        height={25}
        marginTop={18}
        marginLeft={25}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
        }}>
        {[1].map((dt, i) => (
          <ScrollView
            key={dt - i}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 8,
              marginBottom: 10,
            }}>
            <SkeletonPlaceholder.Item
              key={dt - i}
              width={325}
              height={284}
              borderRadius={20}
            />
            {/* <SkeletonPlaceholder.Item width={75} height={20} marginTop={10} /> */}
          </ScrollView>
        ))}
      </View>
     
    </SkeletonPlaceholder>
  );
};
export default LoadingPlaceHolder;
