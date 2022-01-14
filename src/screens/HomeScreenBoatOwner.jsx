import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { getCottagesService, deleteCottageService } from '../api/cottageApiService';
import { logoutService } from '../api/authServices';
import { useNavigate } from 'react-router-dom';
import {getRole} from "../api/axiosInstance";
import Navigation from "../components/Navigation";
import {deleteBoatService, getBoatsService} from "../api/boatApiService";

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
      <h1>My Boats</h1>
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
                    label="Dates"
                    onClick={() => navigate(`/boat/view-dates/${item.id}`)}
                /></td>
                <td><Button
                    type="button"
                    label="Delete"
                    onClick={() => {
                        deleteBoatService(item.id);
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

export default HomeScreenBoatOwner
