import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen';
import ForgotPassword from './screens/ForgotPassword';

import { render } from 'react-dom';

import * as firebase from 'firebase';
import {firebaseConfig} from './config';

firebase.initializeApp(firebaseConfig);


export default class App extends React.Component {

  render(){
    return <AppNavigator />;
  }
}


const AppSwitchNavigator = createSwitchNavigator({
 
  LoadingScreen:LoadingScreen,
  LoginScreen:LoginScreen,
  DashboardScreen:DashboardScreen,
  ForgotPassword:ForgotPassword
});

const AppNavigator = createAppContainer
(AppSwitchNavigator)



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
