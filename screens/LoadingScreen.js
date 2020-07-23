import { StyleSheet, Text, View, ActivityIndicator, ActivityIndicatorBase } from 'react-native';
import React, { Component } from 'react';
import * as firebase from 'firebase';

class LoadingScreen extends Component { 

  componentDidMount(){
    this.checkIfLoggedIn();    
  }
  
  checkIfLoggedIn = () =>{
      firebase.auth().onAuthStateChanged(user => {
          if(user != null)
          {
            this.props.navigation.navigate('DashboardScreen');
          }
          else{
            this.props.navigation.navigate('LoginScreen');
          }
    
      });
  }; 
    
  render() {
      return (
        <View style={styles.container}>
        <ActivityIndicator size = "large" />
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingScreen;
