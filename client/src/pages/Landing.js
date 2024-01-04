import '../assets/styles/Styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react'; // Import useState
import { db, auth, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions

function Landing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const addPostToFirestore = async (title, description, photo, postId, uid) => {
    try {
      const postCollection = collection(db, 'post');

      const docRef = await addDoc(postCollection, {
        title,
        description,
        photo,
        postId,
        uid,
        createdAt: serverTimestamp(),
      });

      console.log('Post added with ID: ', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding post: ', error);
      throw error;
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadImageToStorage = async (imageFile) => {
    try {
      const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);

      await uploadBytes(storageRef, imageFile);

      const downloadURL = await getDownloadURL(storageRef);

      return downloadURL;
    } catch (error) {
      console.error('Error uploading image: ', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFile) {
      const imageUrl = await uploadImageToStorage(imageFile);

      const userUID = auth.currentUser.uid;

      const postId = generateUniquePostId();

      await addPostToFirestore(title, description, imageUrl, postId, userUID);
    }
  };

  const generateUniquePostId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${timestamp}_${random}`;
  };

  return (
    <>
      <Header />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" onChange={handleTitleChange} value={title} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" onChange={handleDescriptionChange} value={description}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">Upload</button>
      </form>

      <Footer />
    </>
  );
}

export default Landing;
