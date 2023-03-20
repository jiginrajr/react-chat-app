import React from 'react';
import {addDoc, addStore, collection, serverTimestamp} from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

const Chat = (props) => {
  const {room} = props;

  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db,  "messages");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!newMessage) return;
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room
    });
    setNewMessage("");

  }
  return (
    <div>
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