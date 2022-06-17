
import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import config from './config.js'
export const firebaseConfig = {
    apiKey: `${config.API_KEY}`,
    authDomain: "signalclone-a5aac.firebaseapp.com",
    projectId: "signalclone-a5aac",
    storageBucket: "signalclone-a5aac.appspot.com",
    messagingSenderId: "416949406222",
    appId: "1:416949406222:web:8eb952affae86750808a5f",
    measurementId: "G-DEB8F81VH4"
  };
  // Initialize Firebase
let app;
  if(firebase.apps.length===0){
    app=firebase.initializeApp(firebaseConfig);
  }
  else{
      app=firebase.app();
  }
  
const db=app.firestore();
const auth=firebase.auth();

export {db,auth};
