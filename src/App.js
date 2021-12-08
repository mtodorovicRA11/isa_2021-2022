import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import AuthWrapper from './components/AuthWrapper';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import NewCottageScreen from './screens/NewCottageScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <AuthWrapper>
            <HomeScreen />
          </AuthWrapper>
        } />
        <Route path="/profile" element={
          <AuthWrapper>
            <ProfileScreen />
          </AuthWrapper>
        } />
        <Route path="/cottage/new" element={
          <AuthWrapper>
            <NewCottageScreen />
          </AuthWrapper>
        } />
        <Route path="/signin" element={<LoginScreen />} />
        <Route path="/signup" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
