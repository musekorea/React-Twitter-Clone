import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Join from '../pages/Join';
import Profile from '../pages/Profile';
import Navbar from './Navbar.js';

function AppRouter({ isLogin, loginUser }) {
  return (
    <div>
      <BrowserRouter>
        {isLogin && loginUser ? <Navbar loginUser={loginUser} /> : null}
        <Routes>
          <Route
            path="/"
            element={isLogin ? <Home loginUser={loginUser} /> : <Login />}
          />
          <Route
            path="/join"
            element={isLogin ? <Home loginUser={loginUser} /> : <Join />}
          />
          <Route
            path="/profile"
            element={isLogin ? <Profile loginUser={loginUser} /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
