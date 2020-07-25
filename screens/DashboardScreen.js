import { StyleSheet, Text, View, Button } from 'react-native';
import React, { Component, useState } from 'react';
import firebase from 'firebase';
import * as Location from 'expo-location';
import * as Permission from 'expo-permissions'

class DashboardScreen extends Component {
  
  render() {
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