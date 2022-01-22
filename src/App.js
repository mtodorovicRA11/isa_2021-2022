import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import AuthWrapper from './components/AuthWrapper';
import HomeScreenCottageOwner from './screens/HomeScreenCottageOwner';
import HomeScreenBoatOwner from './screens/HomeScreenBoatOwner';
import ProfileScreen from './screens/ProfileScreen';
import NewCottageScreen from './screens/NewCottageScreen';
import ViewCottageScreen from './screens/ViewCottageScreen';
import SignUpScreen from './screens/SignUpScreen';
import NewBoatScreen from './screens/NewBoatScreen';
import ViewBoatScreen from './screens/ViewBoatScreen';
import BoatReservationsScreen from "./screens/BoatReservationsScreen";
import NewBoatReservationScreen from "./screens/NewBoatReservationScreen";
import CottageReservationsScreen from "./screens/CottageReservationsScreen";
import NewCottageReservationScreen from "./screens/NewCottageReservationScreen";
import SignInScreen from "./screens/SignInScreen";
import NewBoatReservationReviewScreen from "./screens/NewBoatReservationReviewScreen"
import NewCottageReservationReviewScreen from "./screens/NewCottageReservationReviewScreen"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cottages" element={
          <AuthWrapper>
            <HomeScreenCottageOwner required_role="COTTAGE_OWNER" />
          </AuthWrapper>
        } />
        <Route path="/boats" element={
          <AuthWrapper>
            <HomeScreenBoatOwner required_role="BOAT_OWNER"/>
          </AuthWrapper>
        } />
        <Route path="/boat/new" element={
          <AuthWrapper>
            <NewBoatScreen required_role="BOAT_OWNER"/>
          </AuthWrapper>
        } />
        <Route path="/profile" element={
          <AuthWrapper>
            <ProfileScreen />
          </AuthWrapper>
        } />
        <Route path="/cottage/new" element={
          <AuthWrapper>
            <NewCottageScreen required_role="COTTAGE_OWNER"/>
          </AuthWrapper>
        } />
        <Route path="/cottage/view/:cottageId" element={
          <AuthWrapper>
            <ViewCottageScreen />
          </AuthWrapper>
        } />
        <Route path="/signin" element={<SignInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/boat/view/:boatId" element={
          <AuthWrapper>
            <ViewBoatScreen />
          </AuthWrapper>
        } />
        <Route path="/boat/:boatId/reservations" element={
          <AuthWrapper>
            <BoatReservationsScreen />
          </AuthWrapper>
        } />
        <Route path="/boat/:boatId/reservations/new" element={
          <AuthWrapper>
            <NewBoatReservationScreen required_role="BOAT_OWNER"/>
          </AuthWrapper>
        } />
        <Route path="/boat/:boatId/reservations/:reservationId/review" element={
          <AuthWrapper>
            <NewBoatReservationReviewScreen required_role="BOAT_OWNER"/>
          </AuthWrapper>
        } />
        <Route path="/cottage/:cottageId/reservations/:reservationId/review" element={
          <AuthWrapper>
            <NewCottageReservationReviewScreen required_role="COTTAGE_OWNER"/>
          </AuthWrapper>
        } />
        <Route path="/cottage/:cottageId/reservations" element={
          <AuthWrapper>
            <CottageReservationsScreen />
          </AuthWrapper>
        } />
        <Route path="/cottage/:cottageId/reservations/new" element={
          <AuthWrapper>
            <NewCottageReservationScreen required_role="COTTAGE_OWNER"/>
          </AuthWrapper>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
