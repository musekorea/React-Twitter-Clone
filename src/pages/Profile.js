import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Profile() {
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
  return (
    <div>
      Profile
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
