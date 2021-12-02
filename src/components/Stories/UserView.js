/* eslint-disable */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MI from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';

class UserView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {props} = this;
    return (
      <View style={styles.userView}>
        <FastImage source={{uri: props.profile}} style={styles.image} />
        <View style={{flex: 1}}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity>
            <MI
              name="more-horiz"
              color="white"
              size={25}
              style={{marginRight: 14}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onClosePress}>
            <Icon
              name="close"
              color="white"
              size={25}
              style={{marginRight: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 44,
    height: 44,
    borderRadius: 25,
    marginLeft: 8,
    borderColor: '#fff',
    borderWidth: 1,
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    width: '98%',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 3,
    color: 'white',
    textTransform: 'capitalize',
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 3,
    marginLeft: 12,
    color: 'white',
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UserView;
