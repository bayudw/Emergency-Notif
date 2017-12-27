import React, { Component } from 'react';
import {AsyncStorage, Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import { Container,Content, Icon } from 'native-base';

var{width,height}= Dimensions.get('window');

export default class Chatbox2 extends Component { 
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
          <View style={styles.header}>
              <Image style={{width: 40, height: 40, marginLeft: 150, marginTop: 30,}} source={require('./fireman.png')}/>
          </View>
          <View style={styles.footer}>
              <Content>
                <Icon name='add' style={{fontSize: 35, color: '#484b54', marginLeft: 10, marginTop: 15}}/>
              </Content>
              <TextInput style={styles.input}
                placeholder='Text message'
                placeholderTextColor= '#757982'
                underlineColorAndroid= 'transparent'
                onChangeText={(text) => this.setState({text})}> 
              </TextInput>
              <Content>
                <Icon name='send' style={{fontSize: 35, color: '#484b54', marginLeft: 10, marginTop: 15}}/>
              </Content>
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fafafc',
    width: width,
    height: height,
  },
header: {
    backgroundColor: '#313541',
    width: width,
    height: 90,
    flexDirection: 'row',
  },
footer: {
    backgroundColor: '#e4e3e3',
    width: width,
    height: 70,
    marginTop: 490,
    flexDirection: 'row',
  },
input: {
    backgroundColor: '#fafafc',
    width: 260,
    height: 35,
    paddingVertical: 10,
    marginTop: 15,
    color: '#757982',
    textAlign: 'left',
    fontSize: 14,
    marginRight: 5,
    paddingLeft: 10,
    flexDirection: 'row',
  },


});
