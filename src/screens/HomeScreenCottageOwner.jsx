import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import {getCottagesService, deleteCottageService, getFilteredCottagesService} from '../api/cottageApiService';
import { signOutService } from '../api/authServices';
import { useNavigate } from 'react-router-dom';
import {getRole} from "../api/axiosInstance";
import Navigation from "../components/Navigation";
import {getFilteredBoatsService} from "../api/boatApiService";

const HomeScreenCottageOwner = () => {
  const [cottages, setCottages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const role = getRole();

  useEffect(() => {
    const getCottages = async () => {
      setIsLoading(true);
      const data = await getCottagesService();
      setCottages(data ?? [])
      setIsLoading(false);
    }

    const timer = setTimeout(() => {
      getCottages()
    }, 100);
    return () => clearTimeout(timer);

  }, [])

  if (isLoading) return "Loading...";

  if(role !== "BOAT_OWNER" && role !== "COTTAGE_OWNER") return (
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
          const data = await getFilteredCottagesService(searchValue);
          setCottages(data ?? [])
        }}/>
      <h1>My Cottages</h1>
        <td><Button
          type="button"
          label="Add New"
          onClick={() => navigate(`/cottage/new`)}
        /></td>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Rating</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {cottages.map(item => (
            <tr key={item.id}>
              <th scope="row">{item.name}</th>
              <td>{item.address}</td>
              <td>{item.rating}</td>
              <td><Button
                  type="button"
                  label="View"
                  onClick={() => navigate(`/cottage/view/${item.id}`)}
              /></td>
                <td><Button
                    type="button"
                    label="Reservations"
                    onClick={() => navigate(`/cottage/${item.id}/reservations`)}
                /></td>
                <td><Button
                    type="button"
                    label="Delete"
                    onClick={() => {
                        deleteCottageService(item.id).then(r => window.location.reload());
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

export default HomeScreenCottageOwner
