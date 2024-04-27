
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1pbvBrRjeAYqtyQ_lwFRHl80MmvniSsU",
  authDomain: "house-marketplace-app-6c276.firebaseapp.com",
  projectId: "house-marketplace-app-6c276",
  storageBucket: "house-marketplace-app-6c276.appspot.com",
  messagingSenderId: "243692596372",
  appId: "1:243692596372:web:7e4b98bf4ddaaa4dd7d881"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()