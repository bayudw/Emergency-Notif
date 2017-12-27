import React, { Component } from 'react';
import {AsyncStorage, Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import Drawer from 'react-native-drawer';
import { Container } from 'native-base';
import { MapView, Constants, Location, Permission } from 'expo';

var{width,height}= Dimensions.get('window');

export default class Dashboard extends Component { 
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };


  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: -8.7927717, longitude: 115.1768733}},
  };

   componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location, });
 };


  render() {
    const { navigate } = this.props.navigation;
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={<View style={{width: width/1.5, height: height, backgroundColor: '#313541'}}> 
              <View style={styles.container1}>
                <TouchableOpacity onPress=  {() => navigate('Chatbox1')}>
                <View style={{flexDirection: 'row'}}> 
                  <Image style={{width: 35, height: 35}} source={require('./police.png')}/>
                <Text style={{fontSize: 20, color: 'white', marginTop: 5, marginLeft: 10}}> Police</Text>
                </View>
                </TouchableOpacity>
              </View>
              <View style={styles.container2}>
                <TouchableOpacity onPress=  {() => navigate('Chatbox2')}>
                <View style={{flexDirection: 'row'}}> 
                  <Image style={{width: 35, height: 35}} source={require('./fireman.png')}/>
                <Text style={{fontSize: 20, color: 'white', marginTop: 5, marginLeft: 10}}> Fire fighter</Text>
                </View>
                </TouchableOpacity>
              </View>
              <View style={styles.container3}>
                <TouchableOpacity onPress=  {() => navigate('Chatbox3')}>
                <View style={{flexDirection: 'row'}}> 
                  <Image style={{width: 35, height: 35}} source={require('./hospital.png')}/>
                <Text style={{fontSize: 20, color: 'white', marginTop: 5, marginLeft: 10}}> Hospital</Text>
                </View>
                </TouchableOpacity>
              </View>
              <View style={styles.container4}>
                <TouchableOpacity onPress=  {() => navigate('Chatbox4')}>
                <View style={{flexDirection: 'row'}}> 
                  <Image style={{width: 35, height: 35}} source={require('./pln.png')}/>
                <Text style={{fontSize: 20, color: 'white', marginTop: 5, marginLeft: 10}}> Electric company</Text>
                </View>
                </TouchableOpacity>
              </View>
              </View>}
              tapToClose={true}
              openDrawerOffset={0.2} // 20% gap on the right side of drawer
              panCloseMask={0.2}
              closedDrawerOffset={-3}
              styles={drawerStyles}
              tweenHandler={(ratio) => ({
                main: { opacity:(2-ratio)/2 }
              })}
              >
              <View style={styles.header}>
              <TouchableOpacity onPress=  {() => this.openControlPanel()}> 
                <Image style={styles.menu}
                  source={require('./menu.png')}
                 />
              </TouchableOpacity>
              <TextInput style={styles.search}
                placeholder='Search here'
                placeholderTextColor= '#757982'
                underlineColorAndroid= 'transparent'
                onChangeText={(text) => this.setState({text})}> 
              </TextInput>
              <TouchableOpacity onPress={() => navigate('Profile')}> 
                 <Image style={styles.profil}
                  source={require('./profile.png')}
                 />
              </TouchableOpacity>
            </View>
              <Container>
                <MapView style={{width: width, height: height}}
                  region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                  onRegionChange={this._handleMapRegionChange}
                >
                  <MapView.Marker
                    coordinate={this.state.location.coords}
                    title="Your location"
                    
                  />
                </MapView>

                  <Text>
                    Location: {this.state.locationResult}
                  </Text>

                </Container>
                <Container style={{position:'absolute', alignItems:'center', marginLeft: width/2.225, marginTop: height/8 }} >
                 <View style={styles.gps}>
                      <TouchableOpacity onPress=  {() => this.haha()}>
                      <View>
                        <Image style={{width: 45, height: 45, alignSelf: 'center'}} source={require('./gps.png')}/>
                      </View>
                      </TouchableOpacity>
                    </View>     
                </Container>
            </Drawer>
        
    );
  }
}

const styles = StyleSheet.create({
header: {
    backgroundColor: '#313541',
    width: width,
    height: 90,
    flexDirection: 'row',
  },
menu: {
    width: 30,
    height: 30,
    marginTop: 40,
    marginLeft: 10,
  },
profil: {
    width: 30,
    height: 30,
    marginTop: 40,
    marginLeft: 10,
  },
search: {
    backgroundColor: '#464a53',
    alignSelf: 'center',
    width: 260,
    height: 35,
    marginTop: 20,
    paddingVertical: 10,
    color: '#757982',
    textAlign: 'left',
    fontSize: 14,
    marginLeft: 10,
    paddingLeft: 10,
    flexDirection: 'row',
  },
container1: {
   paddingVertical: 20,
   flexDirection: 'row',
   marginTop: 30,
   paddingLeft: 20,
  },
container2: {
   paddingVertical: 20,
   flexDirection: 'row',
   paddingLeft: 20,
  },
container3: {
   paddingTop: 20,
   flexDirection: 'row',
   paddingLeft: 20,
  },
container4: {
   paddingTop: 40,
   flexDirection: 'row',
   paddingLeft: 20,
  },
gps: {
   alignItems: 'center',
   marginTop: 500,
  },



});

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}