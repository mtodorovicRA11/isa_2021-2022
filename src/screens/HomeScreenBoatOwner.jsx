import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { getCottagesService, deleteCottageService } from '../api/cottageApiService';
import { signOutService } from '../api/authServices';
import { useNavigate } from 'react-router-dom';
import {getRole} from "../api/axiosInstance";
import Navigation from "../components/Navigation";
import {deleteBoatService, getBoatsService, getFilteredBoatsService} from "../api/boatApiService";

const HomeScreenBoatOwner = () => {
  const [boats, setBoats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const role = getRole();

  useEffect(() => {
    const getBoats = async () => {
      setIsLoading(true);
      const data = await getBoatsService();
      setBoats(data ?? [])
      setIsLoading(false);
    }

    const timer = setTimeout(() => {
      getBoats()
    }, 100);
    return () => clearTimeout(timer);

  }, [])

  if (isLoading) return "Loading...";

  if (role !== "BOAT_OWNER" && role !== "COTTAGE_OWNER") return (
    <div>
      No homepage for this Role (yet)
      <Button
        type="button"
        label="Sign Out"
        onClick={() => {
          signOutService();
          navigate("/signin");
        }
        }
      />
    </div>
  )

  return (
    <div className="container">
      <Navigation handleSearch={async (searchValue) => {
        const data = await getFilteredBoatsService(searchValue);
        setBoats(data ?? [])
      }}/>
      <h1>My Boats</h1>
      <td><Button
        type="button"
        label="Add New"
        onClick={() => navigate(`/boat/new`)}
      /></td>
      <table className="table table-striped">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Address</th>
          <th scope="col">Rating</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        {boats.map(item => (
          <tr key={item.id}>
            <th scope="row">{item.name}</th>
            <td>{item.type}</td>
            <td>{item.address}</td>
            <td>{item.rating}</td>
            <td><Button
              type="button"
              label="View"
              onClick={() => navigate(`/boat/view/${item.id}`)}
            /></td>
            <td><Button
              type="button"
              label="Reservations"
              onClick={() => navigate(`/boat/${item.id}/reservations`)}
            /></td>
            <td><Button
              type="button"
              label="Delete"
              onClick={() => {
                deleteBoatService(item.id).then(r =>
                  window.location.reload()
                );
              }
              }
            /></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>

  )
}

export default HomeScreenBoatOwner
