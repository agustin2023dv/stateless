// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "./.env";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyDjLJidg5gErXrviJloYzfUZ_8_r1qS0LA",
  authDomain: "stateless-5e843.firebaseapp.com",
  projectId: "stateless-5e843",
  storageBucket:"stateless-5e843.appspot.com",
  messagingSenderId: "831049862396",
  appId: "1:831049862396:web:32bb60d45cb440c9d49b79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
