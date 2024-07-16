import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      const response = await axios.get('http://localhost:8080/dishes');
      setDishes(response.data.data);
    };

    //display all dishes
    fetchDishes();

    //real time update done by refreshing the page every one second
    const intervalId = setInterval(fetchDishes, 1000);


    return () => clearInterval(intervalId);
  }, []);

  const togglePublished = async (id) => {
    await axios.put(`http://localhost:8080/dishes/${id}`);
  };

  return (
    <div>
      <header className="header">
        <h1>Nosh</h1>
      </header>
      <div className="container">
        <div className="dish-list">
          {dishes.map((dish) => (
            <div key={dish.dishId} className="dish-card">
              <img src={dish.imageUrl} alt={dish.dishName} />
              <div className="dish-card-content">
                <h2>{dish.dishName}</h2>
                <button onClick={() => togglePublished(dish.dishId)}>
                  {dish.isPublished ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
