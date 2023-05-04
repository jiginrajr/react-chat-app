import React, { useEffect, useState } from 'react';
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where} from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

const Chat = (props) => {
  const {room} = props;
  const [newMessage, setNewMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const messageRef = collection(db,  "messages");

  useEffect(() => {
    //need a query to listen to 
    const queryMessages = query(messageRef, where("room", "==", room),  orderBy('createdAt'));
    //subscribing to a change event in firestore
    const unsubscribe = onSnapshot(queryMessages, (snapShot) => {
      let messages = [];
      snapShot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id})
      });
      console.log("messages",messages);
      setMessagesList(messages);
    });

    //clean up function
    return () => unsubscribe();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!newMessage) return;
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),//a server time stamp provided by firestore
      user: auth.currentUser.displayName,
      room
    });
    setNewMessage("");
  }

  return (
    <div>
      <h1 style={{color:"red"}}>{room}</h1>
      <div>{ messagesList.map((message) => (
        <h4>{`${message.user} : ${message.text}`}</h4>
      ))}</div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Type you message here' 
          value={newMessage}
          onChange={(e) => 
          setNewMessage(e.target.value)
          }/>
          <button type='submit'>Send</button>
        </form>
    </div>
  )
}

export default Chat