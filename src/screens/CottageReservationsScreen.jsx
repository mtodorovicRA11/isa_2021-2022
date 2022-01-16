import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from "../components/Navigation";
import {getCottageReservationsService} from "../api/cottageReservationsApiService";
import {getCottageService} from "../api/cottageApiService";

const CottageReservationsScreen = () => {
  const [reservations, setReservations] = useState([]);
  const [cottage, setCottage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let { cottageId } = useParams();

  useEffect(() => {
    const getReservations = async () => {
      setIsLoading(true);
      const data = await getCottageReservationsService(cottageId);
      setReservations(data ?? [])
      const cottage = await getCottageService(cottageId);
      setCottage(cottage ?? null)
      setIsLoading(false);
    }
    const timer = setTimeout(() => {
      getReservations()
    }, 300);
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
          onClick={() => navigate(`/cottage/${cottageId}/reservations/new`)}
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

export default CottageReservationsScreen
