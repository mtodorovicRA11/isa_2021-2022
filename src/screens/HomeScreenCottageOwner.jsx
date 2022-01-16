import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { getCottagesService, deleteCottageService } from '../api/cottageApiService';
import { logoutService } from '../api/authServices';
import { useNavigate } from 'react-router-dom';
import {getRole} from "../api/axiosInstance";
import Navigation from "../components/Navigation";

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
                    logoutService();
                    navigate("/signin");
                }
                }
            />
    </div>
)

  return (
      <div className="container">
        <Navigation handleSearch={() => {}} />
          {/*<header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">*/}
          {/*    <ul className="nav nav-pills">*/}
          {/*        <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">My Cottages</a></li>*/}
          {/*        <li className="nav-item"><a href="/cottage/new" className="nav-link">Add Cottage</a></li>*/}
          {/*    </ul>*/}
          {/*</header>*/}
      <h1>My Cottages</h1>
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
                    onClick={() => navigate(`/boat/${item.id}/reservations`)}
                /></td>
                <td><Button
                    type="button"
                    label="Delete"
                    onClick={() => {
                        deleteCottageService(item.id);
                        window.location.reload();
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
