// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAKY2Ubgz89EDlkP70eyJQwu3R-e_qolms",
  authDomain: "expo--signin-firebase-93349.firebaseapp.com",
  projectId: "expo--signin-firebase-93349",
  storageBucket: "expo--signin-firebase-93349.appspot.com",
  messagingSenderId: "516061784024",
  appId: "1:516061784024:android:37345e0ce42b340f58b4ad"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export {
  auth,
  db,
  doc,
  setDoc,
  Timestamp,
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification
};