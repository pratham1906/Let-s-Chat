import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import ListItem from '../Components/listItem'
import { Avatar } from "react-native-elements";
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
const Home = ({ navigation }) => {

    const [chats, setChats] = useState([]);


    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (setChats(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        })))))
        return unsubscribe
    }, [])



console.log(chats);



    const signout = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    }
    useLayoutEffect(() => {

        navigation.setOptions({
            title: 'Signal',
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: 'black' },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity activeOpacity={.5} onPress={signout}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 70,
                    marginRight: 20
                }}>
                    <TouchableOpacity activeOpacity={0.5} >
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddChat')}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])

    const enterChat=(id,chatName)=>{
        navigation.navigate('Chat',{
            id:id,
            chatName:chatName
        })
    }
    return (
        <SafeAreaView>
            <ScrollView style={{ height: '100%' }}>
                {chats.map(({ id, data: { chatName } }) => (
                    <ListItem id={id} chatName={chatName} key={id} enterChat={enterChat}/>
                ))}

            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})
