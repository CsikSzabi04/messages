import { Button, TextField } from '@mui/material';
import { addDoc, collection, deleteDoc, doc, onSnapshot, or, orderBy, query, Timestamp, where } from 'firebase/firestore';
import React from 'react'
import { useState, useEffect } from 'react';
import { FaDeleteLeft } from "react-icons/fa6";

export default function Messages({user, db}) {

  const[messages, setMessages] = useState([]);
  const[kinek, setKinek] = useState("");
  const[uzenet, setUzenet] = useState("");

  useEffect(() => {
    //where("kinek", "==", user.email), 
    if(user){
      const email = user.email;
      const unsub = onSnapshot(query(collection(db, "messages"), /* or(where("kinek", "==", user.email), where("ki", "==", user.email)), */ orderBy("mikor")), (snap) => {setMessages(snap.docs.map(doc => ({...doc.data(), id:doc.id})));
    });
    return unsub;
  }
  },[user]);

  async function ujUzenet() {
    await addDoc(collection(db,"messages"), {ki:user.email, kinek:kinek, uzenet:uzenet, mikor:Timestamp.now().toDate()});
  }

  function enter(e){
    if(e.key == "Enter") ujUzenet();
  }

  async function del(id) {
      await deleteDoc(doc(db, "messages", id)); 
  }

  return (
    <div className='messages' onKeyDown={e => enter(e)}>
      {user ? <>
        <div className='uzenet'>
          <TextField 
            required
            label="Címzett email"
            size="small"
            value={kinek}
            onChange={e => setKinek(e.target.value)}
          />
          <TextField 
            required
            label="Üzenet"
            size="small"
            value={uzenet}
            onChange={e => setUzenet(e.target.value)}
            
          />
        <Button 
          variant='contained'
          color='success'
          onClick={ujUzenet}
        > Send</Button>
        </div>
        {messages.map(x => <div className='r'> <p key={x.id}>{x.ki} - {x.kinek} : {x.uzenet} ({x.mikor.toDate().toLocaleDateString('hu-HU')}) <FaDeleteLeft className='del' onClick={() => del(x.id)}/></p> </div>)}
      </>: "Log in or register!" }
      
    </div>
  )

}
