import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from "../components/Navigation";
import {getBoatService} from "../api/boatApiService";
import {getBoatReservationsService} from "../api/boatReservationsApiService";

const BoatReservationsScreen = () => {
  const [reservations, setReservations] = useState([]);
  const [boat, setBoat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let { boatId } = useParams();

  useEffect(() => {
    const getReservations = async () => {
      setIsLoading(true);
      const data = await getBoatReservationsService(boatId);
      setReservations(data ?? [])
      const boat = await getBoatService(boatId);
      setBoat(boat ?? null)
      setIsLoading(false);
    }
    const timer = setTimeout(() => {
      getReservations()
    }, 100);
    return () => clearTimeout(timer);

  }, [])

  if (isLoading) return "Loading...";

  return (
      <div className="container">
        <Navigation handleSearch={() => {}} />
          {/*<header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">*/}
          {/*    <ul className="nav nav-pills">*/}
          {/*        <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">My Cottages</a></li>*/}
          {/*        <li className="nav-item"><a href="/cottage/new" className="nav-link">Add Cottage</a></li>*/}
          {/*    </ul>*/}
          {/*</header>*/}
      <h1>Reservations for </h1>
        <td><Button
          type="button"
          label="Add New"
          onClick={() => navigate(`/boat/${boatId}/reservations/new`)}
        /></td>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Beginning</th>
            <th scope="col">End</th>
            <th scope="col">Available</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(item => (
            <tr key={item.id}>
              <th scope="row">{item.beginning}</th>
              <td>{item.end}</td>
              <td>{item.available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default BoatReservationsScreen