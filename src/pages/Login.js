import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  GithubAuthProvider,
} from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const auth = getAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signIn = await signInWithEmailAndPassword(auth, email, password);
      const user = signIn.user;
      console.log(user);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };
  const handleSocialLogin = async (e) => {
    const { name } = e.target;

    if (name === `google`) {
      try {
        const provider = new GoogleAuthProvider();
        const googleLogin = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(googleLogin);
        const token = credential.accessToken;
        const user = googleLogin.user;
        console.log(user);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      }
    } else if (name === `github`) {
      try {
        const provider = new GithubAuthProvider();
        const githubLogin = await signInWithRedirect(auth, provider);
        const credential = GithubAuthProvider.credentialFromResult(githubLogin);
        const token = credential.accessToken;
        const user = githubLogin.user;
        console.log(user);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={handleChange}
        />
        <input type="submit" value="Login" />
      </form>
      <p>{errorMessage}</p>
      <p>
        <Link to={'/join'}>Create an account </Link>
      </p>
      <div>
        <button onClick={handleSocialLogin} name="google">
          Continue with Google
        </button>
        <button onClick={handleSocialLogin} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
}

export default Login;
