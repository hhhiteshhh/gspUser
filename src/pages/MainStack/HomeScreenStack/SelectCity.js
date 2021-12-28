import React, {useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Colors} from '../../../colors';
import Destination from '../../../components/Destination';
import Icon from 'react-native-easy-icon';
import LinearGradient from 'react-native-linear-gradient';
import StatusBarComponent from '../../../components/StatusBarComponent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SelectCity = ({navigation, route, exploreScreenData}) => {
  const [index, setIndex] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [results, setResults] = useState(exploreScreenData);
  const [searchQuery, setSearchQuery] = useState('');
  const [focus, setFocus] = useState(false);
  const {event, eventSelected, seeMore, eventId} = route.params;

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
          Select City
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
        backgroundColor: Colors.base,
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
      },
    });
  }, [navigation]);

  const [textInputFocused, setTextInputFocused] = useState(false);
  const onChangeSearch = q => {
    if (q.length === 0) {
      setTextInputFocused(true);
    }
    setSearchQuery(q);
    showResult(q);
  };
  const showResult = q => {
    setResults(exploreScreenData);
    if (q) {
      let ele = [];
      exploreScreenData.forEach(element => {
        if (element.cityName?.toLowerCase().includes(q.toLowerCase())) {
          ele.push(element);
        }
      });
      setResults(ele);
    } else {
      setResults(exploreScreenData);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.root}>
      <StatusBarComponent backgroundColor={Colors.base} />
      <View style={styles.input}>
        <Icon
          name={'search'}
          type={'ionicon'}
          color={'rgba(0,0,0,0.3)'}
          size={20}
          style={{marginLeft: 4}}
        />
        <TextInput
          placeholder="Lets find the perfect destination"
          style={{height: 40, marginLeft: 18, color: '#000'}}
          placeholderTextColor={'rgba(0,0,0,0.3)'}
          onChangeText={text => onChangeSearch(text)}
          onSubmitEditing={() => {
            onChangeSearch(searchQuery);
          }}
          value={searchQuery}
          onFocus={() => {
            setFocus(true);
            setResults('');
          }}
        />
        {focus && (
          <TouchableOpacity
            style={{position: 'absolute', right: 10}}
            onPress={() => {
              Keyboard.dismiss();
              setResults(exploreScreenData);
              setFocus(false);
              setSearchQuery('');
              setTextInputFocused(false);
            }}>
            <Icon
              name={'cross'}
              type={'entypo'}
              color={'rgba(0,0,0,0.3)'}
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setResults(exploreScreenData);
          setFocus(false);
        }}> */}
        {results.length !== 0 && !textInputFocused ? (
          <ScrollView
            style={{marginTop: 20}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexWrap: 'wrap',
                display: 'flex',
                flexDirection: 'row',
                marginLeft: windowWidth < 390 ? 20 : 0,
              }}>
              {results?.map((city, id) => (
                <TouchableOpacity
                  key={id}
                  onPress={() => {
                    setIndex(id), setSelectedCity(city);
                  }}
                  style={{marginHorizontal: windowWidth < 390 ? 0 : 16}}>
                  <Destination
                    title={city.cityName}
                    image={city.displayPhotoUrl}
                    index={index}
                    id={id}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              onPress={() => {
                if (selectedCity) {
                  seeMore
                    ? navigation.navigate('AddBooking', {
                        event: event,
                        locationId: {
                          cityId: selectedCity?.city,
                          countryId: selectedCity?.country,
                          destinationId: selectedCity?.id,
                        },
                        eventId: eventId,
                        amount: route.params.amount,
                        cityName: selectedCity?.cityName,
                      })
                    : navigation.navigate('Location', {
                        location: selectedCity,
                        data: selectedCity,
                        eventSelected: eventSelected,
                        event: event,
                      });
                  setFocus(false);
                  setIndex();
                  setSelectedCity();
                  setResults(exploreScreenData);
                  setSearchQuery('');
                } else {
                  ToastAndroid.show(
                    'A location is to be selected',
                    ToastAndroid.SHORT,
                  );
                }
              }}
              style={{marginTop: 6}}>
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
                    backgroundColor: selectedCity ? 'transparent' : '#fff',
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
                      color: selectedCity ? Colors.white : '#000',
                    }}>
                    Next
                  </Text>
                  <Icon
                    type="antdesign"
                    name="arrowright"
                    size={25}
                    color={selectedCity ? Colors.white : '#000'}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <View style={{height: 100}} />
          </ScrollView>
        ) : (
          <>
            {searchQuery?.length > 0 && results?.length === 0 && (
              <View>
                <Text
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    marginTop: windowHeight * 0.4,
                  }}>
                  No Such Destination Available
                </Text>
              </View>
            )}
          </>
        )}
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

export default SelectCity;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.base,
    height: '100%',
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginLeft: 25,
    marginRight: 25,
    paddingLeft: 11,
    padding: 5,
    borderRadius: 20,
    elevation: 6,
    marginTop: 7,
    zIndex: 999,
  },
  container: {
    flex: 1.0,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  grediant: {
    height: 44,
    width: 300,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '99%',
    margin: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    alignSelf: 'center',
    padding: 10,
  },
});
