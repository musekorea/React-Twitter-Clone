import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Navbar({ loginUser }) {
  if (loginUser.displayName === null) {
    const name = loginUser.email.split('@')[0];
    loginUser.displayName = name;
  }
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
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{loginUser.displayName}'s Profile</Link>
          {loginUser.photoURL ? (
            <img
              src={loginUser.photoURL}
              alt=""
              style={{ width: '20px', borderRadius: '50%' }}
            />
          ) : null}
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
      <hr></hr>
    </nav>
  );
}

export default Navbar;
