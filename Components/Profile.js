import React, { Component } from 'react';
import { AsyncStorage, Platform, StyleSheet, Dimensions, Image, View, Text, Picker, TextInput, TouchableOpacity } from 'react-native';
import { logout } from './auth';
import DatePicker from 'react-native-datepicker';
import { Container, Content, Icon } from 'native-base';
import * as firebase from 'firebase';

var{width,height}=Dimensions.get('window');

export default class Profile extends Component {
  
  constructor(props) {
    super(props)
    var userId = firebase.auth().currentUser.uid;
    this.state = {
      email: '',
      fullname: '',
      date: '',
      gender: '',
      userId : userId,
      logoutText: 'Logout'
    }
  }

  handlePress() {
    const { navigate } = this.props.navigation;
    this.setState({logoutText: 'Loading..'})
    logout()
      .then(() => this.removeSession())
      .then(() => this.setState({logoutText: 'Logout'}))
      .then(() => navigate('SignIn'))
      .catch((error) => alert(error))
  }

  removeSession() {
    AsyncStorage.removeItem('@Email:key')
  }

  getSession() {
    AsyncStorage.getItem('@Email:key').then((jsonData) => {
      let email = JSON.parse(jsonData);
      this.setState({
        email: email
      })
    })
  }

  componentWillMount() {
  	let time = new Date();
    firebase.database().ref('users/'+this.state.userId).child('info').on('value', (snap) => {
    	this.setState({
    		email : snap.val().email,
    		fullname : snap.val().fullname,
    		date : time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate(),
    		gender : snap.val().gender
    	});
    });
  }
  componentDidMount() {
    this.getSession()
  }

  saveChanges() {
  	const { navigate } = this.props.navigation;
  	firebase.database().ref('users/'+this.state.userId).child('info').update({
  		fullname : this.state.fullname,
  		birthdate : this.state.date,
  		gender : this.state.gender,
  	});
  	navigate("Dashboard");
  }


  render() {
  	return (
      <View style={styles.container}>
      	<Image style={styles.profile} source={require('./profile.png')}/>
      	
      	<TextInput style={styles.fullname}
              placeholder='Full name'
              value = {this.state.fullname}
              placeholderTextColor= '#757982'
              underlineColorAndroid= 'transparent'
              onChangeText={(text) => this.setState({fullname: text})} />
        
        <DatePicker
              style={styles.datebirth}
              date={this.state.date}
              mode="date"
              placeholder="Select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(date) => {this.setState({date: date})}}
        />
      	<Picker style={styles.gender}
          selectedValue={this.state.gender}
          onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>

          
        <TextInput style={styles.email}
          placeholder='E-mail address'
          placeholderTextColor= '#757982'
          value = {this.state.email}
          underlineColorAndroid= 'transparent'
          onChangeText={(text) => this.setState({email: text})} />
          <Text 
      		onPress={() => this.saveChanges()}
      		style={styles.button}>
      			Save
      	</Text>
      	<Text 
      		onPress={() => this.handlePress()}
      		style={styles.button}>
      			{this.state.logoutText}
      	</Text>
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
    marginTop: 20,
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
  profile: {
    alignSelf: 'center',
    marginTop: 30,
    width: 100,
    height: 100,
  },
  fullname: {
    backgroundColor: '#464a53',
    alignSelf: 'center',
    width: 320,
    marginTop: 15,
    paddingVertical: 10,
    color: '#757982',
    textAlign: 'left',
    paddingLeft: 10,
  },
  datebirth: {
    backgroundColor: '#464a53',
    alignSelf: 'center',
    width: 320,
    marginTop: 16,
    paddingVertical: 10,
    color: '#757982',
    textAlign: 'left',
    paddingLeft: 10,
  },
  gender: {
    backgroundColor: '#464a53',
    alignSelf: 'center',
    width: 320,
    fontSize: 10                ,
    marginTop: 16,
    paddingVertical: 10,
    color: '#757982',
    textAlign: 'left',
    paddingLeft: 10,
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
});
