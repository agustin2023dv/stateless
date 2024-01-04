import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

function MyProfile() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  
  useEffect(() => {
    // Use Firebase Authentication to access the logged-in user
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUser(authUser);
      } else {
        // User is not logged in
        setUser(null);
      }
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []);


  const handleSignOut = () => {

    auth.signOut().then(() => {
      history.push('/');
    });
  };

  return (
    <>
      {user ? (
        <div>
          <h1>Hello, {user.displayName || user.email}!</h1>
          <p>Email: {user.email}</p>
   
            {/* Sign out button */}
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <h1>Hello, Guest</h1>

        </div>
      )}
    </>
  );
}

export default MyProfile;
