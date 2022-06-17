import { useNavigation } from '@react-navigation/core'

import React,{useState,useLayoutEffect} from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View,StatusBar } from 'react-native'
import {Image,Input,Button,Text} from 'react-native-elements'
import {auth} from '../firebase'
const Register = ({navigation}) => {
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  const [imageUrl,setImageUrl]=useState('');




  const register=()=>{
auth.createUserWithEmailAndPassword(email,password).then((authUser)=>{
    authUser.user.updateProfile({
        displayName:name,
        photoURL:imageUrl,
        
    })
}
).catch(error=>alert(error.message))

  }
    return (
        <KeyboardAvoidingView  behavior='padding' style={styles.container}>
<StatusBar style="light"/>
<Text h4 style={{marginBottom:50}}>Create a Signal account</Text>
<View style={styles.inputContanier}>
    <Input
    placeholder="Full Name"
    autoFocus
    type="text"
    value={name}
    onChangeText={(text)=>setName(text)}

    />
     <Input
    placeholder="Email"
  
    type="email"
    value={email}
    onChangeText={(text)=>setEmail(text)}
    
    />
     <Input
    placeholder="Password"
 
    type="password"
    secureTextEntry
    value={password}
    onChangeText={(text)=>setPassword(text)}
    
    />
     <Input
    placeholder="Profile Picture URL(optional)"
  
    type="text"
    value={imageUrl}
    onChangeText={(text)=>setImageUrl(text)}
    onSubmitEditing={register}
    />



</View>
<Button 
raised
containerStyle={styles.button}
onPress={register}
title="Register" 
/>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container:{
flex:1,

alignItems:'center',
padding:10,
height:300
    },
    inputContanier:{
width:300
    },
    button:{
width:200,
marginTop:10
    }
})
