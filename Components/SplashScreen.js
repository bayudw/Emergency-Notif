import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Image,
  AsyncStorage,
  View
} from 'react-native';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from 'react-native-indicators';
import * as firebase from 'firebase';
var{width,height}=Dimensions.get('window');

export default class SplashScreen extends Component {
  
constructor() {
        super();
        this.state = ({
            email : "",
            password : "",
        });
        AsyncStorage.multiGet(["email","password","userId"]).then((data) => {
            const { navigate } = this.props.navigation;
            let email = data[0][1];
            let password = data[1][1];
            let userId = data[2][1];
            if(email!=null){
                firebase.auth().signInWithEmailAndPassword(email,password).then(() => {
                    navigate('Dashboard');
                }).catch((Error) => {
                    alert(Error.toString());
                    navigate('SignIn');
                });
            }
            else {
                navigate('SignIn');
            }
        });
        console.ignoredYellowBox = [
        'Setting a timer'
      ];

    
}

  render() {
    return (
      <View style={styles.container}>
           <Image style={styles.logo}
              source={require('./logo.png')}
            />
            <DotIndicator  style={{ marginBottom: 250}} color='white' size= {5} count= {5}/>
      </View>
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
  logo: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginTop: 200,
  },

  });