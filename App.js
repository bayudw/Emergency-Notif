import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import SplashScreen from './Components/SplashScreen';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Dashboard';
import Chatbox1 from './Components/Chatbox1';
import Chatbox2 from './Components/Chatbox2';
import Chatbox3 from './Components/Chatbox3';
import Chatbox4 from './Components/Chatbox4';
import Profile from './Components/Profile';

const App = StackNavigator({
  SplashScreen: { 
    screen: SplashScreen,
    navigationOptions: {
      header: null,
    }, 
  },
  SignIn: { 
    screen: SignIn,
    navigationOptions: {
      header: null,
    }, 
  },
  SignUp: { 
    screen: SignUp, 
    navigationOptions: {
      header: null,
    },
  },
  Dashboard: { 
    screen: Dashboard,
    navigationOptions: {
      header: null,
    },
  },
  Chatbox1: { 
    screen: Chatbox1,
    navigationOptions: {
      header: null,
    },
  },
  Chatbox2: { 
    screen: Chatbox2,
    navigationOptions: {
      header: null,
    },
  },
  Chatbox3: { 
    screen: Chatbox3,
    navigationOptions: {
      header: null,
    },
  },
  Chatbox4: { 
    screen: Chatbox4,
    navigationOptions: {
      header: null,
    },
  },
  Profile: { 
    screen: Profile,
    navigationOptions: {
      header: null,
    },
  },
});

export default App;




