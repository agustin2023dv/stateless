import '../assets/styles/Styles.css';

import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    const emailValue = email;
    const passwordValue = password;

    try {
      // Create a user account in Firebase
      await createUserWithEmailAndPassword(auth, emailValue, passwordValue);

      // If registration is successful, you can perform actions here, such as redirecting the user to another page.
      console.log('Registration successful');

    } catch (error) {
      // Handle registration errors
      console.error('Error registering:', error.message);
    }
  };

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
              placeholder='Enter a username'
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
              placeholder='Enter the same password again'
            />
          </div>

          <input type="submit" value="Create account" />
        </form>
      </div>
    </>
  );
}

export default SignUp;
