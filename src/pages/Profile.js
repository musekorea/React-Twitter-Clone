import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { db } from '../firebase.js';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

function Profile({ loginUser }) {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
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
  return (
    <div>
      Profile
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
