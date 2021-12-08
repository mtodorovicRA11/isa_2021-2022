import React, { useState, useEffect } from 'react'
import Button from '../components/Button';
import { getItemService } from '../api/itemApiService'

const MOCKED_DATA = [{
  "id": 1,
  "name": "First Cottage",
  "address": "Address One",
}, {
  "id": 2,
  "name": "Second Cottage",
  "address": "Address Two",
}, {
  "id": 3,
  "name": "Third Cottage",
  "address": "Address Three",
}]

const HomeScreen = () => {
  const [items, setItems] = useState([]);

  useEffect(async () => {
    const data = await getItemService();
    setItems(MOCKED_DATA);
  }, [])

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
          {MOCKED_DATA.map(item => (
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
        onClick={() => console.log('TODO')}
      />
    </div>
  )
}

export default HomeScreen
