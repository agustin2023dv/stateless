import '../assets/styles/Styles.css';
import { useHistory } from 'react-router-dom';

import { collection, doc, setDoc, query, where,getDocs } from 'firebase/firestore';

import { auth,db,  signInWithGooglePopup } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';


function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const history = useHistory();

  
  const handleSignUp = async (e) => {

    e.preventDefault();
  
    const emailValue = email;
    const passwordValue = password;
    const usernameValue = username; 

    const userQuery = query(collection(db, 'user'), where('username', '==', usernameValue));
    const emailQuery = query(collection(db, 'user'), where('email', '==', emailValue));

    try {
      // Verify if the username is already in use 
      const userQuerySnapshot = await getDocs(userQuery);
      // Verify if the email is already in use 
      const emailQuerySnapshot = await getDocs(emailQuery);


    if (!userQuerySnapshot.empty) {
      // If there's another user with that username 
      userQuerySnapshot.forEach((doc) => {
        alert("Username already taken");
      });
      return;
    }
    if(!emailQuerySnapshot.empty){
      emailQuerySnapshot.forEach((doc)=>{
        alert("Email already in use");
      })
      return;
    }

      // Create a new user 
      const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
  
      // Store the data in a new document which belongs to the "user" collection in our firestore 
      const user = userCredential.user;
      await setDoc(doc(collection(db, 'user'), user.uid), {
        uid: user.uid,
        username: usernameValue,
        email: emailValue,
      });
  
      // If successful, redirect to landing page
      history.push('/');
    } catch (error) {
      // Mistake handler 
      alert('Error registering:', error.message);
    }
  };


  const logGoogleUser = async () => {
  
    try{
      const response = await signInWithGooglePopup();
      alert(response);
    
    
    
      // If successful, redirect to landing page
      history.push('/');
    }
    catch(error){
      // Mistake handler 
      alert('Error registering:', error.message);
    }
    
  }


  return (
    <>
      <div id='header-signup'>
        <div id="got-account">
          <h4>Already got an account?</h4><a href="/sign-up">Sign in!</a>
        </div>
      </div>

      <div id="sign-up">

        <div id="title-sup">
          <h1>Sign Up </h1>
          <h4>It's quick and easy!</h4>
        </div>

        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="fusername">Username</label>
            <input
              type="text"
              id="fusername"
              name="fusername"
              placeholder='Enter an username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Enter your email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lpassword">Password</label>
            <input
              type="password"
              id="lpassword"
              name="lpassword"
              placeholder='Enter a password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lcpassword">Confirm password</label>
            <input
              type="password"
              id="lcpassword"
              name="lcpassword"
              placeholder='Confirm password'
            />
          </div>

          <input type="submit" value="Create account" />

          <div>
            <button onClick={logGoogleUser}>Sign In With Google</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
