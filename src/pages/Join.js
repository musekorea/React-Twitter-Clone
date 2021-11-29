import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const auth = getAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'password2') {
      setPassword2(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setErrorMessage(`Please confirm your password`);
      return;
    }
    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = createUser.user;
      console.log(user);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
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
        <input
          name="password2"
          type="password"
          placeholder="Confirm your Password"
          required
          value={password2}
          onChange={handleChange}
        />

        <input type="submit" value="Join" />
      </form>
      <p>{errorMessage}</p>
    </div>
  );
}

export default Join;
