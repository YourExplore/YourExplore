import { StyleSheet, Text, View, Button } from 'react-native';
import React, { Component } from 'react';
import firebase from 'firebase';

class DashboardScreen extends Component { 
  render() {
      return (
        <View style={styles.container}>
        <Text>DashboardScreen</Text>
        <Button title = 'Sign out' 
          onPress = {() => firebase.auth().signOut()} />
        </View>
    );
  }
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});