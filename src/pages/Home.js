import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

function Home() {
  const [tweet, setTweet] = useState('');
  const handleTweet = (e) => {
    setTweet(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addTweet = await addDoc(collection(db, 'tweets'), {
        tweet,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.log(e);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength="280"
          onChange={handleTweet}
          value={tweet}
        />
        <input type="submit" value="Tweet" />
      </form>
    </div>
  );
}

export default Home;
