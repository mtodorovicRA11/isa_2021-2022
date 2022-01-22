import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from "../components/Navigation";
import {getBoatService, getFilteredBoatsService} from "../api/boatApiService";
import {getBoatReservationsService} from "../api/boatReservationsApiService";
import {getRole} from "../api/axiosInstance";
import {signOutService} from "../api/authServices";

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
      const tempBoat = await getBoatService(boatId);
      setBoat(tempBoat ?? null)
      setIsLoading(false);
    }
    const timer = setTimeout(() => {
      getReservations()
    }, 100);
    return () => clearTimeout(timer);

  }, [])

  function renderAvailability(item) {
    if(item.availableToRent) {
      return item.rentedBy!=="FREE"? item.rentedBy:"Available";
    }

    return "Not Available"
  }

  function renderHeadline(boat) {
    if(boat) {
      return 'Reservations for ' + boat.name
    }
  }

  function renderLeaveAReview(item) {
    //todo: implement check for review to be available only after item.end
    if(item.renterReviewLeft){
      return "Review sent"
    }
    if(item.rentedBy!=="FREE" && item.availableToRent ) {
      return(
        <Button
          type="button"
          label="Leave a Review"
          onClick={() => navigate(`${item.id}/review`)}
        />
      )
    }
  }

  if (isLoading) return "Loading...";

  return (
      <div className="container">
        <Navigation/>
      <h1>{renderHeadline(boat)}</h1>
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
            <th scope="col">Rented By</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(item => (
            <tr key={item.id}>
              <th scope="row">{item.beginning}</th>
              <td>{item.end}</td>
              <td>{renderAvailability(item)}</td>
              <td>{renderLeaveAReview(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default BoatReservationsScreen
