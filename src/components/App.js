import AppRouter from './Router';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';

function App() {
  const auth = getAuth();
  const [isLogin, setIsLogin] = useState(auth.currentUser);

  return (
    <div>
      <AppRouter isLogin={isLogin} />
    </div>
  );
}

export default App;
