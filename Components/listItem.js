import React,{useState,useEffect} from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Avatar, Text } from 'react-native-elements'
import Chat from '../Screens/Chat';
const listItem = ({id,chatName,enterChat}) => {

    const [chatMessages,setChatMessages]=useState([]);
    useEffect(() => {
      const unsubscribe=db.collection('chats').doc(id).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot=>(
          setChatMessages(snapshot.docs.map(doc=>doc.data()))
      ))
    }, [])  
    return (
        <ListItem  onPress={()=>enterChat(id,chatName)} bottomDivider>
            <Avatar rounded
                source={{ uri: chatMessages?.[0].photoURL || 
                
                'https://www.vhv.rs/dpng/d/426-4264903_user-avatar-png-picture-avatar-profile-dummy-transparent.png'}}/>
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '800' }}>
                    {chatName}
              </ListItem.Title>
              <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
{chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
              </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>

    )
}

export default listItem

const styles = StyleSheet.create({})
