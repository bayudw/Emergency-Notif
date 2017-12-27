import React, { Component } from 'react';
import {
  AsyncStorage,
  Alert,
  Platform,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  Text,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Content } from 'native-base';
import { login } from './auth';
import * as firebase from 'firebase';
var{width,height}=Dimensions.get('window');

export default class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '',
      signInText: 'Sign In', 
    };
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }

  setSession(email) {
    try {
      AsyncStorage.setItem('@Email:key', JSON.stringify(email))
    } catch (error) {
      alert(error)
    }
  }

  async login(email,password) {
        try {
            this.setState({signInText: 'Loading..'})
            const { navigate } = this.props.navigation;
            await firebase.auth().signInWithEmailAndPassword(email,password);
            var userId = firebase.auth().currentUser.uid;
            var database = firebase.database().ref("Users").child(userId);
            database.once('value',(snapshot) => {
                AsyncStorage.multiSet([
                    ["email", this.state.email],
                    ["password", this.state.password],
                    ["userId", userId]
                ]);
            });
            navigate('Dashboard');
        } catch (error) {
            alert("Invalid username and password.");
            this.setState({signInText: 'Sign In'})
            }
        }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Content style={styles.container}>
           <Text style={styles.welcome}>
             Welcome to E-Notif
           </Text>
           <Image style={styles.logo}
              source={require('./logo.png')}
            />
            
            {/*E-mail address*/}
            <TextInput style={styles.email}
            placeholder='E-mail address'
            placeholderTextColor= '#757982'
            underlineColorAndroid= 'transparent'
            onChangeText={(text) => this.setState({email: text})} />
            
            {/*Password*/}
            <TextInput style={styles.password}
            placeholder='Password'
            placeholderTextColor= '#757982'
            secureTextEntry= {true}
            underlineColorAndroid= 'transparent'
            onChangeText={(text) => this.setState({password: text})} />

            <Text 
              style={styles.button} 
              onPress={() => this.login(this.state.email, this.state.password)}>
              {this.state.signInText}
            </Text>

            <Text style={styles.signup} onPress={ () => navigate('SignUp') }>
              Don't have an account? Sign up.
            </Text>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#313541',
    width: width,
    height: height,
  },
  welcome: {
    color: '#fcfcfd',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 80,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logo: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    marginTop: 5,
  },
  email: {
    backgroundColor: '#464a53',
    alignSelf: 'center',
    width: 320,
    marginTop: 17,
    paddingVertical: 10,
    color: '#757982',
    textAlign: 'left',
    paddingLeft: 10,
  },
  password: {
    backgroundColor: '#464a53',
    alignSelf: 'center',
    width: 320,
    marginTop: 18,
    paddingVertical: 10,
    color: '#757982',
    textAlign: 'left',
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#08d68b',
    alignSelf: 'center',
    width: 320,
    marginTop: 25,
    color: '#fdfdfe',
    textAlign: 'center',
    paddingVertical: 10,
  },
  signup: {
    color: '#fcfcfd',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 150,
  },
  


});
