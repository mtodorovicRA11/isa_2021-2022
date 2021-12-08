import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { getCottageService } from '../api/cottageApiService';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const [cottages, setCottages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCottages = async () => {
      setIsLoading(true);
      const data = await getCottageService();
      setCottages(data ?? [])
      setIsLoading(false);
    }
    const timer = setTimeout(() => {
      getCottages()
    }, 100);
    return () => clearTimeout(timer);

  }, [])

  if (isLoading) return "Loading...";

  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {cottages.map(item => (
            <tr key={item.id}>
              <th scope="row">{item.name}</th>
              <td>{item.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        type="button"
        label="Add Cottage"
        onClick={() => navigate("/cottage/new")}
      />
    </div>
  )
}

export default HomeScreen
