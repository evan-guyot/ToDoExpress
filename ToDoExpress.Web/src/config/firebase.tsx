// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVz9WXjvzT8LcqOrrzVG7XRBWfTrSBxUM",
  authDomain: "eguyot-todoexpress.firebaseapp.com",
  projectId: "eguyot-todoexpress",
  storageBucket: "eguyot-todoexpress.appspot.com",
  messagingSenderId: "197358969386",
  appId: "1:197358969386:web:b77b5f87c756a3e1929953",
  measurementId: "G-TXZX08XK8N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
