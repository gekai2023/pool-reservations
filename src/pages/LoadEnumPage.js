import React, { useRef } from 'react'
import {addDoc, collection} from "@firebase/firestore"
import { firestore } from '../firebase';
import enums from '../resources/enums';

const LoadEnumPage = () => {
    const messageRef = useRef();
    const ref = collection(firestore, "shifts");
    const handleSave = async (e) => {
        e.preventDefault();
        try{
            for (let i=0; i<enums.shifts.length; i++){
                addDoc(ref, enums.shifts[i]);
            }
        }catch(e){
            console.log(e.message);
        }
    }
  return (
    <button onClick={handleSave}>load</button>
  )
}

export default LoadEnumPage