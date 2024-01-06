import '../assets/styles/Styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { db, storage } from '../firebase'; // Import your Firebase config
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for generating unique IDs


function Landing({ user }) {

  const history = useHistory();

  const [postDetails, setPostDetails] = useState({
    postId: uuidv4(), // Generate a unique ID immediately
    title: "",
    // author: "",
    description: "",
  });

  const handleChange = (e) => {
    e.persist();
    setPostDetails((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value
    }));
  };
  

  const addPost = async postDetails => {
    const postTime = Date.now();

    await db.collection("post").add({
      ...postDetails,
      time: 
      new Intl.DateTimeFormat('en-US',{year:'numeric',month:'long',day:'2-digit',hour:'2-digit',minute:'2-digit'}).format(postTime)
    })
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
  
    try {
      await addPost(postDetails);
      history.push('/');
    } catch (error) {
      console.error('Error adding post:', error);
      // Display error to the user
    }
  }
  return (
    <>
    
    <Header/>


   


    <form id='post' onSubmit={handleSubmit}>

        <div>
          <label>Title</label>
          <input type="text" value={setPostDetails.title} onChange={handleChange} />
        </div>
        <div>
          <label>Description</label>
          <textarea value={setPostDetails.description} onChange={handleChange} />
        </div>

        <div>
          <label>Image</label>
          <input type="file" accept="images/*" />
        </div>

        <button type="submit">Upload</button>

    </form>

    <Footer/>
    </>
  );
}




export default Landing;
