import { useState } from 'react';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
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
          type="text"
          placeholder="Password"
          required
          value={password}
          onChange={handleChange}
        />
        <input type="submit" value="Login" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
}

export default Auth;
