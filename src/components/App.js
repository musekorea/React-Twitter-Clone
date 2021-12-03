import AppRouter from './Router';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const auth = getAuth();
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('login success');
        setInit(true);
        setIsLogin(true);
        setLoginUser(user);
      } else {
        console.log('login failed');
        setInit(true);
        setIsLogin(false);
        setLoginUser(null);
      }
    });
  }, []);

  return (
    <div>
      {init ? (
        <AppRouter isLogin={isLogin} loginUser={loginUser} />
      ) : (
        'Initalizing...'
      )}
    </div>
  );
}

export default App;
