import '../assets/styles/Styles.css';
import statelessLogo75 from '../assets/img/statelessLogo75.png';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useHistory } from 'react-router-dom';
import { getDocs, query, collection, where } from 'firebase/firestore';
import PasswordResetModal from './PasswordResetModal';

function SignIn() {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User has signed in, update user state
        setUser(user);
      } else {
        // User has not signed in, set user state to null
        setUser(null);
      }
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReset = () => {
    // Open the modal when "Forgot password?" is clicked
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const userIDValue = userID;
    try {
      const userQuery = query(collection(db, 'user'), where('username', '==', userIDValue));
      const userQuerySnapshot = await getDocs(userQuery);

      const userDocument = userQuerySnapshot.docs[0]?.data(); // Use "?." to avoid errors if there are no results
      const userEmail = userDocument?.email;

      if (userEmail) {
        // Try to sign in with the email
        const userCredential = await signInWithEmailAndPassword(auth, userEmail, password);
        if (userCredential) {
          // Authentication was successful, redirect the user
          history.push('/');
        } else {
          // Authentication failed, show an error message
          alert('Authentication failed.');
        }
      } else {
        // If no email was found, try to sign in with the username
        const userCredential = await signInWithEmailAndPassword(auth, userID, password);
        if (userCredential) {
          // Authentication was successful, redirect the user
          history.push('/');
        } else {
          // Authentication failed, show an error message
          alert('Authentication failed.');
        }
      }
    } catch (err) {
      // Handle authentication errors
      alert(err.message);
    }
  };

  return (
    <div id="container">
      <header id='header-signin'>
        <div>
          <a href='/'>
            <img src={statelessLogo75} alt='Stateless logo' />
          </a>
        </div>
      </header>

      <form id="sign-in-form" onSubmit={handleSignIn}>
        <div>
          <h1>Welcome to Stateless!</h1>
        </div>

        <div className="form-group">
          <label htmlFor="userID">Username/Email</label>
          <input
            type="text"
            id="userID"
            name="userID"
            placeholder='Enter your username or email'
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p onClick={handleReset}>Forgot password?</p>
        <PasswordResetModal isOpen={isModalOpen} onClose={handleCloseModal} />

        <div id='buttons-su'>
          <button id='button-su' type="submit">
            Login
          </button>

          <button type="button" className="login-with-google-btn">
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
