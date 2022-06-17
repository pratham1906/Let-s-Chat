import React,{useLayoutEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button,Input,Icon} from 'react-native-elements'
import {FontAwesome} from '@expo/vector-icons'
import { db } from '../firebase'
const AddChat = ({navigation}) => {
const [input,setInput]=useState("");


    useLayoutEffect(() => {
      navigation.setOptions({
title:"Add a new Chat",
headerBackTitle:'Chats'
      })
       
    }, [])

    const createChat=async()=>{
        await db.collection('chats').add({
            chatName:input
        }).then(()=>{
            navigation.goBack();
        }).catch(error=>alert(error));
    }
    return (
        <View style={styles.container}>
            <Input
            placeholder="Enter Chat Name"
            value={input}
            onChangeText={(text)=>setInput(text)}
            onSubmitEditing={createChat}
            leftIcon={
                <FontAwesome name="wechat"  size={24} color="black"/>
            }/>
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container:{

    }
})
