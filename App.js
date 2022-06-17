import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import Login from './Screens/Login'
import auth from './firebase'
import Register from './Screens/Register'
import { SafeAreaView, StyleSheet, Text, View ,useEffect} from 'react-native';
import SplashScreen from './Screens/SplashScreen'
import Home from './Screens/Home'
import AddChat from './Screens/AddChat'
import Chat from './Screens/Chat'
const globalScreenOptions={
  headerStyle:{backgroundColor:'#2C6BED'},
  headerTitleStyle:{color:'white'},
  headerTintColor:"white"
}
const Stack=createStackNavigator();

import { LogBox } from 'react-native';


export default function App() {

  return (
   
  <NavigationContainer>
    <Stack.Navigator screenOptions={globalScreenOptions}>
    <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false}}/>
     <Stack.Screen name="Login" component={Login} options={{headerTitleAlign:'center'}}/>
     <Stack.Screen name="Register" component={Register} options={{headerTitleAlign:'center'}} />
<Stack.Screen name='Home' component={Home} options={{headerTitleAlign:'center'}} />
<Stack.Screen name="AddChat" component={AddChat}  />
<Stack.Screen name="Chat" component={Chat} />
     </Stack.Navigator>
  </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
