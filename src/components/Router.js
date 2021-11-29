import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';

function AppRouter({ isLogin }) {
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
