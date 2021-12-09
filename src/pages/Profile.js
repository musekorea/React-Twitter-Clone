import { useEffect, useState } from 'react';
import { db, storage } from '../firebase.js';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

function Profile({ loginUser }) {
  console.log(loginUser);
  const [isEditPopUp, setIsEditPopUp] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [newAvatar, setNewAvatar] = useState('');
  const navigate = useNavigate();

  const getMyTweets = async () => {
    const tweetsRef = collection(db, 'tweets');
    const tweetsQuery = query(
      tweetsRef,
      where('owner', '==', `${loginUser.uid}`),
      orderBy('createdAt', 'desc')
    );
    const myTweets = await getDocs(tweetsQuery);
    myTweets.forEach((tweet) => {
      console.log(tweet.data());
    });
  };
  useEffect(() => {
    getMyTweets();
  }, []);

  const handleEditProfile = (e) => {
    e.preventDefault();
    setIsEditPopUp((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    let imageURL;
    try {
      if (newAvatar) {
        const imageRef = ref(storage, `${loginUser.uid}/${uuidv4()}`);
        const uploadImage = await uploadString(imageRef, newAvatar, 'data_url');
        imageURL = await getDownloadURL(imageRef);
      } else {
        imageURL = null;
      }

      const photoURL = loginUser.photoURL;
      if (photoURL && !imageURL) {
        const deleteRef = ref(storage, `${loginUser.photoURL}`);
        await deleteObject(deleteRef);
      }

      await updateProfile(auth.currentUser, {
        displayName: newNickname,
        photoURL: imageURL,
      });
      navigate('/profile');
      setNewAvatar(null);
      setNewNickname('');
      setIsEditPopUp(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNickname = (e) => {
    setNewNickname(e.target.value);
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setNewAvatar(reader.result);
    };
  };

  return (
    <>
      {!isEditPopUp ? (
        <button onClick={handleEditProfile}>Edit Profile</button>
      ) : (
        <div>
          <div>
            <img src={newAvatar} alt="" style={{ width: '50px' }} />
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nickname">Nickname </label>
            <input
              id="nickname"
              type="text"
              name="displayName"
              placeholder="Nickname"
              onChange={handleNickname}
              value={newNickname}
            />
            <p></p>
            <label htmlFor="avatar">Avatar </label>
            <input
              id="avatar"
              type="file"
              name="photoURL"
              placeholder="Avatar"
              onChange={handleAvatar}
            />
            <p></p>
            <button onClick={handleEditProfile}>Cancel</button>
            <button>Update</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Profile;
