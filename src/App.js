import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import AuthWrapper from './components/AuthWrapper';
import HomeScreen from './screens/HomeScreen';
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
        <Route path="/cottage/new" element={
          <AuthWrapper>
            <NewCottageScreen />
          </AuthWrapper>
        } />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
