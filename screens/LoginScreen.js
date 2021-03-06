import { StyleSheet, Text, View, Button, Image, ImageBackground, TextInput } from 'react-native';
import React, { Component } from 'react';
import { Container, Content, Header, Form, Input, Item, Label } from 'native-base';
import { SocialIcon } from 'react-native-elements';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import {goToForgotPassword} from './LoadingScreen';

class LoginScreen extends Component {

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  
  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential).then(function(result){
            console.log('user signed in ');
            if(result.additionalUserInfo.isNewUser){
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile_picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.now()
              })
              .then(function(snapshot){
              });
            }else{
              firebase
              .database()
              .ref('/users/' + result.user.uid).update({
                gmail: result.user.email,
                profile_picture: result.additionalUserInfo.profile_picture,
                locale: result.additionalUserInfo.profile.locale,
                first_name: result.additionalUserInfo.profile.given_name,
                last_name: result.additionalUserInfo.profile.family_name,
                last_loggin_in: Date.now()
              });

            }
          })
          .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this)
    );
  };


    signInWithGoogleAsync = async () => {
        try {
          const result = await Google.logInAsync({
            behavior: 'web',
            iosClientId: '756145714820-f7afogck48r0hlc35v2kjg0cjg4qg28n.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      };


      constructor(props){
        super(props);

        this.state = {
          email: '',
          password: ''
        }
      }

      signUpUser = (email, password) => {
        if (email == ''){
          alert('Please enter an email to sign up with')
        }
        else if (password.length < 6){
          alert('Please enter a valid password')
        }
          firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use') {
              alert('This email is already is already associated with an account. Please login or click "Forgot Password".');

              // Your action
              return;
            }
          })


        }


      loginInUser = (email, password) => {
        if (email == ''){
          alert('Please enter the email associated with your account')
          return;
        }
        else if (password == ''){
          alert('Please enter your password')
          return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
          alert('User account does not exist')
        })

 
        // try{
        //   firebase.auth().signInWithEmailAndPassword(email, password);
        // } 
        // catch (error){
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        //   alert(errorMessage);
          // if(errorCode === 'There is no user record corresponding to this identifier. The user may have been deleted.'){
          //   alert('User account does not exist');
          //   return;
          // }
          //console.log(error.toString(error));
          //alert('User account does not exist')
        }
        
      
        


      // async signInWithFacebook() {
      //   try {
      //     await Facebook.initializeAsync('2423196017973508');

      //     const { type, token } = await Facebook.logInWithReadPermissionsAsync('2423196017973508', {
      //       permissions: ['public_profile'],
      //     });
      //     if (type === 'success') {
      //       await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      //       const credential = firebase.auth.FacebookAuthProvider.credential(token);
      //       const facebookProfileData = await firebase.auth().signInWithCredential(credential);
      //     }
      //   } catch ({ message }) {
      //     alert(`Facebook Login Error: ${message}`);
      //   }
      // }


    
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
            <Text style={styles.welcomeText}>
              Welcome to YourExplore
            </Text>
             <Form>
                <Item>
                  <Label style={styles.label}>Email</Label>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    color = '#000000'	
                    placeholderTextColor="#B1B1B1"
                    returnKeyType="next"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                  />
                </Item>
                <Item>
                  <Label style={styles.label} >Password</Label>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    color = '#000000'	
                    placeholderTextColor="#B1B1B1"
                    returnKeyType="done"
                    textContentType="newPassword"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                  />
                </Item>
                <Button 
                  color = '#000000'	
                  title = 'Login'
                  onPress = {() => this.loginInUser(this.state.email.trim(), this.state.password)}
                  >
                </Button>
                <Button 
                  title = 'Sign Up'
                  color = '#000000'	
                  onPress = {() => this.signUpUser(this.state.email.trim(), this.state.password)}
                  >
                </Button>
              </Form>
              </View>
            <Button title = 'Forgot Password?' 
            color = '#000000'	
            onPress = {() => this.props.navigation.navigate('ForgotPassword')}
            />
            <SocialIcon 
            style = {styles.socialIconButton}
            type = 'google'	
            title = 'Sign in with Google'
            button
            //color = '#000000'	
            onPress = {() => this.signInWithGoogleAsync()}
            />
            {/* <Button title = 'Sign in with Facebook'
            onPress = {() => this.signInWithFacebook()}
            /> */}
        
        </View>
        
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 100,
    alignItems: 'center',
    backgroundColor: '#fff',
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
  input: {
    margin: 25,
    height: 20,
    width: 150,
    color: '#000000',
    fontSize: 16,
  },
  label:{
    color: '#000000',
    fontSize: 18,
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 50,
    marginBottom: 95,
    fontStyle: 'italic',
  },
  socialIconButton: {
    width: 225
  },
});