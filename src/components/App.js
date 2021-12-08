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
        setLoginUser(user);
        setIsLogin(true);
        setInit(true);
      } else {
        console.log('login failed');
        setInit(true);
        setLoginUser(null);
        setIsLogin(false);
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
