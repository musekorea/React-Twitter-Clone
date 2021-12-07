import { useEffect, useRef, useState } from 'react';
import { db, storage } from '../firebase.js';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import Tweet from '../components/Tweet.js';
import { v4 as uuidv4 } from 'uuid';

function Home({ loginUser, isEditing }) {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInput = useRef();

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
    let imageURL;
    try {
      if (attachedFile) {
        const imageRef = ref(storage, `${loginUser.uid}/${uuidv4()}`);
        const uploadImage = await uploadString(
          imageRef,
          attachedFile,
          'data_url'
        );
        imageURL = await getDownloadURL(imageRef);
      } else {
        imageURL = null;
      }
      const addTweet = await addDoc(collection(db, 'tweets'), {
        owner: loginUser.uid,
        text: tweet,
        createdAt: Date.now(),
        imageURL,
      });
      setTweet('');
      fileInput.current.value = '';
      setAttachedFile(null);
    } catch (error) {
      console.log(e);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setAttachedFile(reader.result);
    };
  };

  const clearPreview = (e) => {
    setAttachedFile(null);
    fileInput.current.value = '';
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
        <p></p>
        {attachedFile ? (
          <div>
            <img src={attachedFile} alt="preview" style={{ width: '50px' }} />
            <button onClick={clearPreview}>Clear</button>
          </div>
        ) : null}
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          ref={fileInput}
        />
        <p></p>
        <input type="submit" value="Tweet" />
      </form>
      <hr />

      <section>
        {tweets.map((content) => {
          return (
            <Tweet
              content={content}
              key={content.id}
              owner={loginUser.uid === content.owner}
              imageURL={content.imageURL}
            />
          );
        })}
      </section>
    </div>
  );
}

export default Home;
