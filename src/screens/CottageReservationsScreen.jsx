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

  function renderAvailability(item) {
    if(item.availableToOccupy) {
      return item.occupiedBy!=="FREE"? item.occupiedBy:"Available";
    }

    return "Not available"
  }

  function renderHeadline(cottage) {
    if(cottage) {
      return 'Reservations for ' + cottage.name
    }
  }

  function renderLeaveAReview(item) {
    //todo: implement check for review to be available only after item.end
    if (item.occupantReviewLeft) {
      return "Review sent"
    }
    if (item.occupiedBy !== "FREE" && item.availableToOccupy) {
      return (
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
        <Navigation />
      <h1>{renderHeadline(cottage)}</h1>
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
            <th scope="col">Occupied By</th>
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

export default CottageReservationsScreen
