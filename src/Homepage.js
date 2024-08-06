import { useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import Header from "./Header"

function Homepage(){

  // const [data, setData] = useState({});

  const username = 'user';
  const password = 'password';
  const token = btoa(`${username}:${password}`);
  const headers = new Headers();
  headers.append('Authorization', `Basic ${token}`);

  // useEffect(() => {
  //   fetch('http://localhost:8080/restaurant/getRestaurantByName/Polke', { headers })
  //     .then(response => response.json())
  //     .then(data => setData(data))
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  return (
    <>
      <div className="homepage-container">
        <Header/>
        <MapComponent/>
      </div>
    </>
  )
}

export default Homepage