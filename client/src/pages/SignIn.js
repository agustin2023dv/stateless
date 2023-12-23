import '../assets/styles/Styles.css';
import statelessLogo75 from '../assets/img/statelessLogo75.png';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth,db} from '../firebase'; // Import auth from your firebase.js file
import { useHistory } from 'react-router-dom';
import { getDocs,query,collection,where } from 'firebase/firestore';


function SignIn() {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();


  const handleSignIn = async (e) => {
    e.preventDefault();
  
    const userIDValue = userID;
    try {
      const userQuery = query(collection(db, 'user'), where('username', '==', userIDValue));
      const userQuerySnapshot = await getDocs(userQuery);
  
      const userDocument = userQuerySnapshot.docs[0]?.data(); // Usar "?." para evitar errores si no hay resultados
      const userEmail = userDocument?.email;
  
      if (userEmail) {
        // Intenta iniciar sesión con el correo electrónico
        const userCredential = await signInWithEmailAndPassword(auth, userEmail, password);
        if (userCredential) {
          // La autenticación fue exitosa, redirige al usuario
          history.push('/');
        } else {
          // La autenticación falló, muestra un mensaje de error
          alert('Authentication failed.');
        }
      } else {
        // Si no se encontró un correo electrónico, intenta iniciar sesión con el nombre de usuario
        const userCredential = await signInWithEmailAndPassword(auth, userID, password);
        if (userCredential) {
          // La autenticación fue exitosa, redirige al usuario
          history.push('/');
        } else {
          // La autenticación falló, muestra un mensaje de error
          alert('Authentication failed.');
        }
      }
    } catch (err) {
      // Handle authentication errors
      alert(err.message);
    }
  };
  

/*  const handleSignIn = async (e) => { 
    e.preventDefault();

    const userIDValue = userID;
    try {
      
      const userQuery = query(collection(db, 'user'), where('username', '==', userIDValue));
      const userQuerySnapshot = await getDocs(userQuery);

      const userDocument = userQuerySnapshot.docs[0].data();
      const userEmail = userDocument.email;

      
      // Use the state variables instead of accessing e.target
      if(await signInWithEmailAndPassword(auth, userID, password)){
        // Redirect to the home page on successful login
        history.push('/');
      } 
      else if(userEmail){ //Here we try to login with the username 

        await signInWithEmailAndPassword(auth, userEmail, password);
        // Redirect to the home page on successful login
        history.push('/');
      }
      
    } catch (err) {
      // Handle authentication errors
      alert(err.message);
    }
  }*/

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

        <a href='/'>Forgot password?</a>

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
