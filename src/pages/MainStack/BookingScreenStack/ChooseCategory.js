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
          <>
            <TouchableOpacity
              onPress={() => {
                selected &&
                  navigation.navigate('AddBooking', {
                    locationId: {
                      cityId: route.params.location?.city,
                      countryId: route.params.location?.country,
                      destinationId: route.params.locationId,
                    },
                    event: categories[id]?.categoryName,
                    eventId: categories[id].uid,
                    amount: route.params.amount,
                    cityName: route.params?.location?.cityName,
                  });
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0.5, y: 0}}
                colors={['#0ee2e2', '#10bef4']}
                style={{
                  borderRadius: 20,
                  width: 141,
                  height: 50,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '97%',
                    backgroundColor: selected ? 'transparent' : '#fff',
                    margin: 2,
                    borderRadius: 20,
                    height: '93%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}>
                  <Text
                    style={{
                      color: Colors.blackLogoText,
                      fontSize: 14,
                      fontFamily: 'Jost-SemiBold',
                      padding: 8,
                      textAlign: 'center',
                      color: selected ? Colors.white : '#000',
                    }}>
                    Next
                  </Text>
                  <Icon
                    type="antdesign"
                    name="arrowright"
                    size={25}
                    color={selected ? Colors.white : '#000'}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '90%',
                marginRight: 'auto',
                marginLeft: 'auto',
                marginVertical: 10,
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
          </>
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
