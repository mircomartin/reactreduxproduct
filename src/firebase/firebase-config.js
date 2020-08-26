import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBj4Izc5mcWIl304cflMKHfKJx0JNkdNPc",
    authDomain: "huntredux.firebaseapp.com",
    databaseURL: "https://huntredux.firebaseio.com",
    projectId: "huntredux",
    storageBucket: "huntredux.appspot.com",
    messagingSenderId: "282221948614",
    appId: "1:282221948614:web:1b043d69a7ada70bc271c7"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export {
    db,
    firebase
}