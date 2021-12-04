import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase.js';
import Tweet from '../components/Tweet.js';

function Home({ loginUser, isEditing }) {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const dbQuery = query(
      collection(db, 'tweets'),
      orderBy('createdAt', 'desc')
    );
    const listenDB = onSnapshot(dbQuery, (results) => {
      const tweetArray = results.docs.map((result) => {
        return { id: result.id, ...result.data() };
      });
      setTweets((prev) => tweetArray);
    });
  }, []);

  const handleTweet = (e) => {
    setTweet(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addTweet = await addDoc(collection(db, 'tweets'), {
        owner: loginUser.uid,
        text: tweet,
        createdAt: Date.now(),
      });
      setTweet('');
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
          required
        />
        <input type="submit" value="Tweet" />
      </form>
      <section>
        {tweets.map((content) => {
          return (
            <Tweet
              content={content}
              key={content.id}
              owner={loginUser.uid === content.owner}
            />
          );
        })}
      </section>
    </div>
  );
}

export default Home;
