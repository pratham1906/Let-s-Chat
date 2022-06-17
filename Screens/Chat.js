import React, { useLayoutEffect, useState } from 'react'
import { StatusBar, TextInput, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import { Input } from 'react-native-elements/dist/input/Input'
import { Keyboard } from 'react-native'
import firebase from 'firebase'
import { auth, db } from '../firebase'


const Chat = ({ navigation, route }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar rounded source={{ uri: 'https://www.vhv.rs/dpng/d/426-4264903_user-avatar-png-picture-avatar-profile-dummy-transparent.png' }} />
                    <Text style={{ color: 'white', marginLeft: 10, fontWeight: '700' }}>{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () =>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 80, marginRight: 20 }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
        })
    }, [])

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats')
            .doc(route.params.id).
            collection('messages').
            orderBy('timestamp', 'asc').
            onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))))
        return unsubscribe;
    }, [route])

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setInput("");
    }
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        < ScrollView contentContainerStyle={{paddingTop:15}}>
                            {messages.map(({ id, data }) =>
                            (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar source={{ uri: data.photoURL }} rounded size={30}
                                            style={{ position: 'absolite', bottom: -15, right: -5 }} />
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                ) :
                                    (
                                        <View style={styles.sender}>
                                            <Avatar />
                                            <Text style={styles.senderText}>{data.message}</Text>
                                            <Text style={styles.senderName}>{data.displayName}</Text>

                                        </View>
                                    )
                            ))}

                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput style={styles.input}
                                placeholder="Signal Message"
                                value={input}
                                onSubmitEditing={sendMessage}
                                onChangeText={(text) => setInput(text)} />
                            <TouchableOpacity activeOpacity={0.5}
                                onPress={sendMessage}>


                                <Ionicons name="send" size={24} color="#2B68E6" />


                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },
    input: {

        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: 'transparent',
        backgroundColor: '#ECECEC',
        borderWidth: 1,
        padding: 10,
        color: 'grey',
        borderRadius: 30
    },

    reciever: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: 'relative'

    },
    recieverText: {
    },
    sender: {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: 'flex-start',
        borderRadius: '20',
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: 'relative'
    },
    senderName:{
left:10,
paddingRight:10,
fontSize:10,
color:'white'
    },
    senderText: {
color:'white',
fontWeight:'500',
marginLeft:10,
marginBottom:15
    }
})
