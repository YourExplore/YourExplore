import { StyleSheet, Text, View, Button } from 'react-native';
import React, { Component, useState } from 'react';
import firebase from 'firebase';
import * as Location from 'expo-location';
import * as Permission from 'expo-permissions'

class DashboardScreen extends Component {
  loc(){
    this.getUserLocation();
  }
  getUserLocation = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    });
  
    let text = 'text';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  };
  render() {
    this.loc
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