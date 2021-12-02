import React, {useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../../colors/index';
import BrowseCategoryCard from '../../../components/BrowseCategoryCard';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-easy-icon';
import StatusBarComponent from '../../../components/StatusBarComponent';
const BrowseCategories = ({
  navigation,
  isGuestUser,
  explore = false,
  route,
  categories,
}) => {
  const [id, setID] = useState();
  const [selected, setSelected] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <Text
          {...props}
          style={{
            color: Colors.blackLogoText,
            fontFamily: 'Jost-SemiBold',
            fontSize: 22,
            lineHeight: 26.4,
            fontWeight: '700',
            marginLeft: -17,
            padding: 0,
          }}>
          {route?.params?.name ? route.params.name : 'Browse Category'}
        </Text>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 20, padding: 0}}
          onPress={() => navigation.goBack()}>
          <Icon type="Entypo" name="chevron-left" size={25} color={'#000'} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: Colors.white,
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
      },
    });
  }, [navigation]);

  const data = {
    categoryName: 'Explore Destinations',
    description: 'Visit over 100+ hand curated destination for you!',
    displayImages: [
      'https://firebasestorage.googleapis.com/v0/b/getsnappers-b188f.appspot.com/o/location%2Fdestination.jpg?alt=media&token=68c73eb7-163c-493f-adb1-ae469489681f',
    ],
  };
  return (
    <View style={{height: '100%', backgroundColor: Colors.white}}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.storiesContainer}>
        <StatusBarComponent backgroundColor={'white'} />
        {!route.params.seeMore && (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SelectCity', {
                  event: '',
                  eventSelected: false,
                })
              }>
              <BrowseCategoryCard
                key={1}
                category={data}
                navigation={navigation}
                isGuestUser={isGuestUser}
                index={1}
                explore={true}
              />
            </TouchableOpacity>
            <View
              style={{width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>
              <Text
                style={{
                  color: Colors.blackLogoText,
                  fontWeight: 'bold',
                  fontSize: 25,
                  marginVertical: 5,
                  textTransform: 'capitalize',
                }}>
                Browse by categories
              </Text>
            </View>
          </>
        )}
        {categories?.map((category, index) => {
          return explore ? (
            <TouchableOpacity
              onPress={() => {
                explore && (setID(index), setSelected(true));
              }}
              key={index}>
              <BrowseCategoryCard
                key={index}
                category={category}
                navigation={navigation}
                isGuestUser={isGuestUser}
                explore={explore}
                index={index}
                id={id}
              />
            </TouchableOpacity>
          ) : (
            <View key={index}>
              <BrowseCategoryCard
                key={index}
                category={category}
                navigation={navigation}
                isGuestUser={isGuestUser}
                explore={explore}
                index={index}
                id={id}
                seeMore={route?.params?.seeMore}
              />
            </View>
          );
        })}
        {explore && (
          <TouchableOpacity
            onPress={() => {
              selected &&
                navigation.navigate('AddBooking', {
                  location: route.params.location,
                  event: categories[id]?.categoryName,
                });
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0.5, y: 0}}
              colors={['#0ee2e2', '#10bef4']}
              style={{
                borderRadius: 20,
                width: '40%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 10,
              }}>
              <View
                style={{
                  width: '98%',
                  backgroundColor: selected ? 'transparent' : '#fff',
                  margin: 2,
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    color: Colors.blackLogoText,
                    fontSize: 25,
                    fontFamily: 'Jost-SemiBold',
                    padding: 8,
                    textAlign: 'center',
                    color: selected ? Colors.white : '#000',
                  }}>
                  Next <Icon type="antdesign" name="arrowright" size={25} />
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default BrowseCategories;

const styles = StyleSheet.create({
  storiesContainer: {
    paddingTop: 7,
    backgroundColor: Colors.white,
  },
});
