import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import getUserLocation from './location_access.js'
/*in order to use the Text, View, Image, etc. features
we have to import them from their respective modules
StatusBar would be imported from 'expo-status-bar'
React from 'react and etc. for others*/

export default function App() {
  getUserLocation()
  return (
    /*styles.<variable_name> means that the formatting is in the
    variable under the StyleSheet*/
    <View style={styles.container}>
      <Text style = {styles.instructions}>
        hello
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

/*under here the formatting is done*/
const styles = StyleSheet.create({
  container: {
    flex: 1, //how much of the screen will be taken up
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
});