import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import React, { Component } from 'react';
import { Container, Content, Header, Form, Input, Item, Label } from 'native-base';
import * as firebase from 'firebase';

class ForgotPassword extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: ''
    }
  }

  handlePasswordReset = async (email) => {
    if (email == ''){
      alert('Please enter the email associated with your account')
      return;
    }
    try{
    firebase.auth().sendPasswordResetEmail(email)
    console.log('Password reset email sent successfully')
    this.props.navigation.navigate('LoginScreen')
    } catch (error){
      alert(error.message)
    }
  }



    render() {
      return (
        <View style = {styles.container}>
          <View style = {styles.backgroundContainer}>
          <Image
            source = {require('./ocean.jpg')}
            style = {styles.backgroundImage}
            >
            </Image> 
            </View>
            <View>
        <Form>
          <Item>
            <Label style={styles.label} >Forgot Password?</Label>
            <TextInput
              style={styles.input}
              placeholder="Enter Email Here "
              placeholderTextColor="#000000"
              returnKeyType="next"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}            />
          </Item>
          <Button 
            color = '#000000'
            iconSize = {10}
            title = 'Sent Password Reset'
            onPress = {() => this.handlePasswordReset(this.state.email.trim())}
            >
          </Button>
        </Form>
        </View>
        <Button title = 'Go back' 
          color = '#000000'
          onPress = {() => this.props.navigation.navigate('LoginScreen')}
        />
      </View>
      )
    }
  }
  
  export default ForgotPassword

  const styles = StyleSheet.create({
    container: {
      flex: 100,
      alignItems: 'center',
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    text: {
      color: '#333',
      fontSize: 24,
      marginLeft: 25
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
    input: {
      margin: 25,
      height: 20,
      width: 150,
      color: '#000000',
      fontSize: 17,
    },
    label:{
      color: '#000000',
      fontSize: 20,
    },
  });