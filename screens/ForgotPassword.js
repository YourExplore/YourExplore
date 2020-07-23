import { StyleSheet, Text, View, Button } from 'react-native';
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
        <Container style = {styles.container}>
        <Form>
          <Item>
            <Label>Forgot Password?</Label>
            <Input
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#B1B1B1"
              returnKeyType="next"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}            />
          </Item>
          <Button 
            iconSize = {10}
            title = 'Sent Password Reset'
            onPress = {() => this.handlePasswordReset(this.state.email.trim())}
            >
          </Button>
        </Form>
        <Button title = 'Go back' 
          onPress = {() => this.props.navigation.navigate('LoginScreen')}
        />
      </Container>
      )
    }
  }
  
  export default ForgotPassword

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      marginTop: 150
    },
    text: {
      color: '#333',
      fontSize: 24,
      marginLeft: 25
    },
  });