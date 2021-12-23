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
import Icon from 'react-native-easy-icon';
const ChooseCategory = ({
  navigation,
  isGuestUser,
  explore = true,
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
            textTransform: 'capitalize',
          }}>
          Choose Category
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
  return (
    <View style={{height: '100%', backgroundColor: Colors.white}}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.storiesContainer}>
        {categories?.map((category, index) => {
          return explore ? (
            <TouchableOpacity
              onPress={() => {
                explore && (setID(index), setSelected(true));
                navigation.navigate('AddBooking', {
                  locationId: {
                    cityId: route.params.location?.city,
                    countryId: route.params.location?.country,
                    destinationId: route.params.locationId,
                  },
                  event: category.categoryName,
                  eventId: category.uid,
                  amount: route.params.amount,
                  cityName: route.params?.location?.cityName,
                });
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
              />
            </View>
          );
        })}
        {explore && (
          <TouchableOpacity
            style={{
              width: '90%',
              marginRight: 'auto',
              marginLeft: 'auto',
              // marginVertical: 5,
            }}
            onPress={() => {
              navigation.navigate('AddBooking', {
                locationId: {
                  cityId: route.params.location?.city,
                  countryId: route.params.location?.country,
                  destinationId: route.params.locationId,
                },
                event: '',
                eventId: '',
                amount: route.params.amount,
                cityName: route.params?.location?.cityName,
              });
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: Colors.blue,
                fontSize: 14,
                fontWeight: '700',
                fontFamily: 'Jost-Bold',
                marginTop: 20,
                lineHeight: 21,
              }}>
              Skip
            </Text>
          </TouchableOpacity>
        )}
        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
};

export default ChooseCategory;

const styles = StyleSheet.create({
  storiesContainer: {
    paddingTop: 7,
    backgroundColor: Colors.white,
  },
});
