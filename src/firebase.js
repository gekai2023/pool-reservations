import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBCI3iMQfuo_EYUL2OmK1V-j0hzemNAx4w",
  authDomain: "maanit-pool-5bda2.firebaseapp.com",
  projectId: "maanit-pool-5bda2",
  storageBucket: "maanit-pool-5bda2.appspot.com",
  messagingSenderId: "561678533156",
  appId: "1:561678533156:web:eb32adc2bdb756b6c1ceb1"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);