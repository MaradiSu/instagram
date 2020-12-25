import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {Text, View} from 'react-native';

import * as firebase from 'firebase';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import Register from './components/auth/Register';
import { render } from 'react-dom';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbyZwfPacAQm1FLR-Mm5HYeyEHltn6h0E",
  authDomain: "instagram-d5477.firebaseapp.com",
  projectId: "instagram-d5477",
  storageBucket: "instagram-d5477.appspot.com",
  messagingSenderId: "144047155205",
  appId: "1:144047155205:web:665127d34b6a987ac9d46c",
  measurementId: "G-Q7MH9V93RS"
};
if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  console.log("initialized");
}

const Stack = createStackNavigator();

export class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    loggedIn: false,
    loaded: false
  }
}
componentDidMount(){
  firebase.auth().onAuthStateChanged((user) => {
    if(!user) {
      this.setState({
        loggedIn: false,
        loaded: true
      })
    } else {
      this.setState({
        loggedIn: true,
        loaded: true
      })
    }
  })
}
  render(){
    const { loggedIn, loaded} = this.state;
    if(!loaded) {
      return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text>Loading</Text>
        </View>
      );
    }
    if(!loggedIn) {
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="Register" component={Register} />        
        </Stack.Navigator>
        </NavigationContainer>
        
      );
    }
    return(
      <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>User loaded</Text>
      </View>
    );

    

  }
  
}

export default App;
