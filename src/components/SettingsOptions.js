import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../colors';
import Icon from 'react-native-easy-icon';
import {InitialContext} from '../context';
const SettingsOptions = ({
  title,
  type,
  name,
  color,
  size,
  navigation,
  goToScreen,
  signOutParam,
}) => {
  const {signOut} = useContext(InitialContext);
  const handleSignOut = () => {
    signOut();
  };
  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() =>
        signOutParam ? handleSignOut() : navigation.navigate(goToScreen)
      }>
      <Icon type={type} name={name} size={size} color={color} />
      <Text
        style={{
          fontSize: 14,
          marginLeft: 12,
          fontWeight: '500',
          fontFamily: 'Jost-SemiBold',
          color: '#000',
          textTransform: 'capitalize',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SettingsOptions;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.white,
    marginVertical: 10,
    width: '90%',
    height: 49,
    paddingLeft: 12,
    padding: 10,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 'auto',
    elevation: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: Colors.white,
    marginVertical: 10,
    width: '90%',
    padding: 10,
    borderRadius: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    elevation: 4,
    left: 20,
  },
});
