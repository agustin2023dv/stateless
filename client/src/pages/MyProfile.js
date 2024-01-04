import React, { useEffect, useState } from 'react';
import { auth} from '../firebase';

function MyProfile() {
  const [loggedUser, setUser] = useState(null);

  
  const user = auth.currentUser;
  useEffect(() => {
    // Use Firebase Authentication to access the logged-in user
    const unsubscribe = auth.onAuthStateChanged((loggedUser) => {
      if (user) {
        // User is logged in
        setUser(loggedUser);
      } else {
        // User is not logged in
        setUser(null);
      }
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <>

      {loggedUser ? (
        <div>
          <h1>Hello, {loggedUser.displayName || loggedUser.email}!</h1>
        
          <p>Email: {loggedUser.email}</p>
          <p>User ID: {loggedUser.uid}</p>
     
        </div>
      ) : (
        <div>
          <h1>Hello, Guest</h1>
          {/* Display content for guests */}
        </div>
      )}
    </>
  );
}

export default MyProfile;
