import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import history from './history';
import './App.css';

import AuthWrapper from './components/AuthWrapper';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route path="/" element={
          <AuthWrapper>
            <HomeScreen />
          </AuthWrapper>
        } />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
