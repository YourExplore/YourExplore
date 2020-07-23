import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
/*in order to use the Text, View, Image, etc. features
we have to import them from their respective modules
StatusBar would be imported from 'expo-status-bar'
React from 'react and etc. for others*/
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen';

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
  DashboardScreen:DashboardScreen
});

const AppNavigator = createAppContainer
(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1, //how much of the screen will be taken up
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});