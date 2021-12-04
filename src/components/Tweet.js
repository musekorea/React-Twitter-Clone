import { db } from '../firebase.js';
import { doc, deleteDoc } from '@firebase/firestore';

const Tweet = ({ content, owner }) => {
  const handleDelete = async (e) => {
    const ok = window.confirm('Are you sure want to delete this tweet?');
    if (ok) {
      await deleteDoc(doc(db, 'tweets', `${content.id}`));
    } else {
      return;
    }
  };
  return (
    <>
      <div>{content.text}</div>
      {owner && (
        <>
          <button>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </>
  );
};

export default Tweet;
