import React from 'react'
import { StyleSheet, Text, View ,Image} from 'react-native'
import {auth} from '../firebase'
const SplashScreen = ({navigation}) => {
    setTimeout(()=>{
           
        const unsubscribed=auth.onAuthStateChanged((authUser)=>{
            console.log(authUser);
               if(authUser){
                   navigation.replace('Home');
               }
               else{
                   navigation.replace('Login')
               }
           })
        
        return unsubscribed;

      
    },3000)
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
           <Image style={styles.image} source={require('../assets/SignalLogo.png')} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    image:{
        width:300,
        height:300
    }
})
