import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../routes/Home';
import Auth from '../routes/Auth';
import Profile from '../routes/Profile';
import EditProfile from '../routes/EditProfile';
import { useState } from 'react';

function AppRouter() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLogin ? <Home /> : <Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="editProfile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
