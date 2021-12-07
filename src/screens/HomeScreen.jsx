import React, { useState, useEffect } from 'react'
import Button from '../components/Button';
import { getItemService } from '../api/itemApiService'

const MOCKED_DATA = [{
  "id": 1,
  "name": "Minerva",
  "address": "mserjent0@yandex.ru",
}, {
  "id": 2,
  "name": "Anastasia",
  "address": "asunley1@jiathis.com",
}, {
  "id": 3,
  "name": "Randi",
  "address": "rsuccamore2@storify.com",
}]

const HomeScreen = () => {
  const [items, setItems] = useState([]);

  useEffect(async () => {
    const data = await getItemService();
    setItems(data);
  }, [])

  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {MOCKED_DATA.map(item => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
              <td>{item.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        type="button"
        label="Click!"
        onClick={() => console.log('TODO')}
      />
    </div>
  )
}

export default HomeScreen
