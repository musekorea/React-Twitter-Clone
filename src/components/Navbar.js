import { Link } from 'react-router-dom';

function Navbar({ loginUser }) {
  console.log(`네브바`, loginUser.displayName);
  if (loginUser.displayName === null) {
    const name = loginUser.email.split('@')[0];
    loginUser.displayName = name;
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{loginUser.displayName}'s Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
