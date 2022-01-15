import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import AuthWrapper from './components/AuthWrapper';
import HomeScreenCottageOwner from './screens/HomeScreenCottageOwner';
import HomeScreenBoatOwner from './screens/HomeScreenBoatOwner';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import NewCottageScreen from './screens/NewCottageScreen';
import ViewCottageScreen from './screens/ViewCottageScreen';
import RegisterScreen from './screens/RegisterScreen';
import NewBoatScreen from './screens/NewBoatScreen';
import ViewBoatScreen from './screens/ViewBoatScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cottages" element={
          <AuthWrapper>
            <HomeScreenCottageOwner />
          </AuthWrapper>
        } />
        <Route path="/boats" element={
          <AuthWrapper>
            <HomeScreenBoatOwner />
          </AuthWrapper>
        } />
        <Route path="/boat/new" element={
          <AuthWrapper>
            <NewBoatScreen />
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
        <Route path="/cottage/view/:cottageId" element={
          <AuthWrapper>
            <ViewCottageScreen />
          </AuthWrapper>
        } />
        <Route path="/signin" element={<LoginScreen />} />
        <Route path="/signup" element={<RegisterScreen />} />
        <Route path="/boat/view/:boatId" element={
          <AuthWrapper>
            <ViewBoatScreen />
          </AuthWrapper>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
