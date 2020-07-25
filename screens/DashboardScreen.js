import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React, { Component, useState } from 'react';
import firebase from 'firebase';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

class DashboardScreen extends Component {
  state = {
    location: null,
    errorMsg: null
  };
  findLoc = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);
        this.setState({latitude, longitude});
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  };
  
  _isMounted = false;
  findLocAsync = async () => {
    let { status } = await Permissions.askAsync
    (Permissions.LOCATION);
    
    if (status !== 'granted' && this._isMounted) {
      this.setState({errorMsg: 'Permission to access location was denied'});
    }
    let location = await Location.getCurrentPositionAsync({});
    if (this._isMounted) {
      this.setState({ location });
    }
  };
  componentDidMount() {
    this._isMounted = true;
  };
  componentWillUnmount() {
    this._isMounted = false;
  };

  render() {
    this.findLocAsync()
      return (
        /*styles.<variable_name> means that the formatting is in the
        variable under the StyleSheet*/
        <View style={styles.container}>
        <Text>DashboardScreen</Text>
        <Button title = 'Sign out' 
          onPress = {() => firebase.auth().signOut()} />
        </View>
    );
  }
}

export default DashboardScreen;
/*under here the formatting is done*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});