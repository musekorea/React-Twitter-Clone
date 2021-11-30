import AppRouter from './Router';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const auth = getAuth();
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('login상태');
        setInit(true);
        setIsLogin(true);
      } else {
        console.log('nologin상태');
        setInit(true);
        setIsLogin(false);
      }
    });
  }, []);

  return <div>{init ? <AppRouter isLogin={isLogin} /> : 'Initaling...'}</div>;
}

export default App;
