import { StyleSheet, Text, View, Button } from 'react-native';
import React, { Component } from 'react';
import { Container, Content, Header, Form, Input, Item, Label } from 'native-base';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';

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
          .signInAndRetrieveDataWithCredential(credential).then(function(result){
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
        try{
          firebase.auth().createUserWithEmailAndPassword(email, password)

        }
        catch{error}(
          alert('hi')
        )

      }

      loginInUser = (email, password) => {
        try{
          firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
            console.log(user)
          })
        }
        catch{error}(
          console.log(error),
          alert('User account does not exist')
        )
        
      }

      async signInWithFacebook() {
        try {
          await Facebook.initializeAsync('2423196017973508');

          const { type, token } = await Facebook.logInWithReadPermissionsAsync('2423196017973508', {
            permissions: ['public_profile'],
          });
          if (type === 'success') {
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            const facebookProfileData = await firebase.auth().signInWithCredential(credential);
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }


       

    
  render() {
      return (
        <Container style = {styles.container}>
              <Form>
                <Item>
                  <Label>Email</Label>
                  <Input
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#B1B1B1"
                    returnKeyType="next"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                  />
                </Item>
                <Item>
                  <Label>Password</Label>
                  <Input
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#B1B1B1"
                    returnKeyType="done"
                    textContentType="newPassword"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                  />
                </Item>
                <Button 

                  title = 'Login'
                  onPress = {() => this.loginInUser(this.state.email.trim(), this.state.password)}
                  >
                </Button>
                <Button 
                  full
                  rounded
                  primary
                  title = 'Sign Up'
                  onPress = {() => this.signUpUser(this.state.email.trim(), this.state.password)}
                  >
                </Button>
              </Form>
            <Button title = 'Sign in with Google' 
            onPress = {() => this.signInWithGoogleAsync()}
            />
            <Button title = 'Sign in with Facebook'
            onPress = {() => this.signInWithFacebook()}
            />
        </Container>
        
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});