import React, { useState,useEffect } from 'react'
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import {auth} from '../firebase'
const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      
        
            
           const unsubscribed=auth.onAuthStateChanged((authUser)=>{
            console.log(authUser);
               if(authUser){
                   navigation.replace('Home');
               }
           })
        
        return unsubscribed;
    }, [])
    const signIn=()=>{
        auth.signInWithEmailAndPassword(email,password).catch(error=>alert(error))
    }
   
    return (
        
        <KeyboardAvoidingView behavior='padding' style={{justifyContent:'center',alignItems:'center',flex:1,height:300}}>
            <Image style={styles.image} source={require('../assets/SignalLogo.png')} />
            <Input 
            placeholder="Email"
                autoFocus type="Email"
                value={email}
                containerStyle={{width:300}}
                onChangeText={(text) => setEmail(text)} />
            <Input placeholder="Password"
                secureTextEntry
                containerStyle={{width:300}}
                autoFocus
                type="password"
                value={password}
                onSubmitEditing={signIn}
                onChangeText={(text) => setPassword(text)} />
            <Button containerStyle={styles.button} onPress={signIn}  title='Login' />
            <Button containerStyle={styles.button} onPress={()=>navigation.navigate('Register')} title='Register' type='outline' />

        </KeyboardAvoidingView>
        
    )
}

export default Login

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200
    },
    button:{
width:200,
margin:10
    }
})
