import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaDeleteLeft } from "react-icons/fa6";
import './users.css';

export default function Users({db}) {

  const [users, setUsers] = useState([]);

  useEffect(() =>{
    async function getUsers() {
      const snap = await getDocs(query(collection(db, "users"), orderBy("nev")));
      setUsers(snap.docs.map(doc => ({...doc.data(), id:doc.id})));
    }
    getUsers();
  }, []);

  async function del(id) {
    await deleteDoc(doc(db, "users", id)); 
  }

  return (
    <div className='users'>
      {users.map(x => <div className='row'> <p key={x.id}><li > {x.nev} ({x.email})  <FaDeleteLeft className='del' onClick={() => del(x.id)}/> </li></p></div> )}
    </div>
  )
}
