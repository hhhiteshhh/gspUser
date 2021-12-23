import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import {Colors} from '../colors';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';

const BrowseCategoryCard = ({
  category,
  navigation,
  isGuestUser,
  explore,
  index,
  id,
  seeMore = false,
}) => {
  const [categoryData, setCategoryData] = useState([]);
  const [showData, setShowData] = useState(false);
  useEffect(() => {
    firestore()
      .collection('packages')
      .doc(category?.basicPackage)
      .onSnapshot(doc => {
        setCategoryData(doc.data());
      });
  }, [category]);
  const handleImageLoad = async () => {
    setShowData(true);
  };
  return (
    <View
      style={{
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 20,
        display: 'flex',
        borderRadius: 20,
        borderWidth: 2,
        overflow: 'hidden',
        opacity: 0.9,
        elevation: 8,
        borderColor: explore && id === index ? Colors.blue : 'transparent',
        height: 150,
      }}>
      <FastImage
        source={{uri: category?.displayImages[0]}}
        style={styles.image}
        onLoad={handleImageLoad}>
        {showData && (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            locations={[0, 0.5, 0.7, 0.9]}
            colors={['#000', 'transparent', 'transparent', 'transparent']}
            style={{
              borderRadius: 13,
              opacity: 1,
              height: 150,
            }}>
            <Text
              // animation="fadeIn"
              // duration={800}
              style={{
                fontSize: 18,
                color: Colors.white,
                fontWeight: '500',
                fontFamily: 'Jost-SemiBold',
                padding: 11,
                opacity: 1,
                lineHeight: 26,
                textTransform: 'capitalize',
              }}>
              {category?.categoryName}
            </Text>
            <Text
              // animation="fadeIn"
              // duration={800}
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                fontSize: 12,
                color: Colors.white,
                fontWeight: '400',
                fontFamily: 'Jost-Regular',
                padding: 10,
                paddingLeft: 12,
                width: '85%',
                lineHeight: 17,
              }}>
              {category?.description}
            </Text>
          </LinearGradient>
        )}
      </FastImage>
      {showData && !explore && (
        // <Animatable.View animation="fadeIn" duration={800}>
        <TouchableOpacity
          style={{
            width: 140,
            position: 'absolute',
            bottom: 10,
            left: 11,
            zIndex: 999,
          }}
          onPress={() => {
            if (isGuestUser == 'true') {
              navigation.navigate('LoginNotice');
            } else {
              seeMore || !explore
                ? navigation.navigate('CategoryPage', {
                    data: category,
                    amount: categoryData,
                  })
                : navigation.navigate('SelectCity', {
                    event: category.categoryName,
                    eventSelected: true,
                  });
            }
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#0ee2e2', '#10bef4']}
            style={{
              borderRadius: 10,
              zIndex: 999,
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: 15,
                fontFamily: 'Jost-SemiBold',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingLeft: 27,
                paddingRight: 27,
                paddingVertical: 4,
                textTransform: 'capitalize',
              }}>
              Book Now
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        // </Animatable.View>
      )}
    </View>
  );
};

export default BrowseCategoryCard;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    opacity: 0.85,
  },
});
