import { db, storage } from '../firebase.js';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { ref, deleteObject } from '@firebase/storage';

const Tweet = ({ content, owner, editing }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(content.text);

  const handleDelete = async (e) => {
    const ok = window.confirm('Are you sure want to delete this tweet?');
    if (ok) {
      try {
        await deleteDoc(doc(db, 'tweets', `${content.id}`));
        if (content.imageURL) {
          const imageRef = ref(storage, content.imageURL);
          await deleteObject(imageRef);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  const toggleEdit = (e) => {
    setIsEditing((prev) => !prev);
  };
  const handleCancel = () => {
    setIsEditing(false);
    return;
  };

  const handleEdit = (e) => {
    setNewTweet((prev) => e.target.value);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'tweets', `${content.id}`), {
      text: newTweet,
    });
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={content.text}
              onChange={handleEdit}
              value={newTweet}
            />
            <button onClick={handleCancel}>Cancel</button>
            <button>Update Tweet</button>
          </form>
        </>
      ) : (
        <>
          <div>{content.text}</div>
          {content.imageURL ? (
            <div>
              <img src={content.imageURL} style={{ width: '100px' }} />
            </div>
          ) : null}

          {owner ? (
            <>
              <button onClick={toggleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default Tweet;
