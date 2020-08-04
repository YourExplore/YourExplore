import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
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
        this.setState({ latitude, longitude });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  _isMounted = false;
  findLocAsync = async () => {
    let { status } = await Permissions.askAsync
      (Permissions.LOCATION);

    if (status !== 'granted' && this._isMounted) {
      this.setState({ errorMsg: 'Permission to access location was denied' });
    }
    let location = await Location.getCurrentPositionAsync({});
    if (this._isMounted) {
      this.setState({ location });
    }
  };
  componentDidMount() {
    this._isMounted = true;
    console.log(firebase.auth().currentUser.uid);
    //update user info to database
    var user = firebase.auth().currentUser;
    console.log("adding user to database");
    firebase
      .database()
      .ref("/users/" + user.uid)
      .set({
        email: user.email,
        last_loggin_in: Date.now(),
      });
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
        <View style={styles.backgroundContainer}>
          <Image
            source={require('./ocean.jpg')}
            style={styles.backgroundImage}
          >
          </Image>
        </View>
        <Text>DashboardScreen</Text>
        <Button title='Sign out'
          onPress={() => firebase.auth().signOut()} />
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
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});