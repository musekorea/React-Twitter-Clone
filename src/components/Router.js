import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Join from '../pages/Join';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import Navbar from './Navbar.js';

function AppRouter({ isLogin }) {
  return (
    <div>
      <BrowserRouter>
        {isLogin ? <Navbar /> : null}
        <Routes>
          <Route path="/" element={isLogin ? <Home /> : <Login />} />
          <Route path="/join" element={isLogin ? <Home /> : <Join />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="editProfile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
