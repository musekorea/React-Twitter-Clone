import AppRouter from './Router';
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const auth = getAuth();
  const [isLogin, setIsLogin] = useState(auth.currentUser);

  const loginState = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('login상태');
      console.log(user);
      setIsLogin(true);
    } else {
      console.log('nologin상태');
      console.log(user);
      setIsLogin(false);
    }
  });

  return (
    <div>
      <AppRouter isLogin={isLogin} />
    </div>
  );
}

export default App;
