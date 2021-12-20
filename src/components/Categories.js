import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ProgressiveImage from './ProgressiveImage';
const Categories = ({category, navigation}) => {
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    firestore()
      .collection('packages')
      .doc(category?.basicPackage)
      .onSnapshot(doc => {
        setCategoryData(doc.data());
      });
  }, [category]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('CategoryPage', {
          data: category,
          amount: categoryData,
        });
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
        marginBottom: 10,
      }}>
      <ProgressiveImage
        thumbnailSource={{
          uri: `${category.displayImages[0]}`,
        }}
        source={{uri: category.displayImages[0]}}
        style={{
          width: 101,
          height: 69,
          borderRadius: 11,
          // elevation: 10,
        }}
        resizeMode="cover"
        borderRadius={11}
        elevation={10}
      />
      <Text
        style={{
          textAlign: 'center',
          paddingTop: 10,
          width: 75,
          height: 37,
          fontSize: 12,
          lineHeight: 15,
          fontWeight: '400',
          fontFamily: 'Jost-Medium',
          color: '#000',
          textTransform: 'capitalize',
        }}>
        {category.categoryName}
      </Text>
    </TouchableOpacity>
  );
};

export default Categories;

const styles = StyleSheet.create({});
