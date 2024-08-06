// MapComponent.js
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {useState, useEffect} from 'react'

// Fix for default icon issues with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
  const position = [26.156142023294983, -80.13787520684676];
  const addresses = ["2055 Wilton Dr, Wilton Manors, FL 33305"]
  const [bars, setBars] = useState([]);

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight * 0.5,
    width: window.innerWidth * 0.8,
  });

  useEffect(() => {

    const fetchCoordinates = async (address) => {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`);
      const data = await response.json();
      if (data.length > 0) {
        return { address, location: data[0] };
      } else {
        console.error(`Geocoding failed for address: ${address}`);
        return null;
      }
    };

    const fetchAllCoordinates = async () => {
      const results = await Promise.all(addresses.map(address => fetchCoordinates(address)));
      setBars(results.filter(result => result !== null));
    };

    fetchAllCoordinates();
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight * 0.5,
        width: window.innerWidth * 0.8,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [addresses]);

  

  return (
    <MapContainer className="map-container" center={position} zoom={13} style={{height: dimensions.height, width: dimensions.width}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {bars.map((bar, idx) => (
        <Marker key={idx} position={[bar.location.lat, bar.location.lon]}>
          <Popup>
            {bar.address}
          </Popup>
        </Marker>
      ))}
      <Marker position={position}>
        You are here. <br/> Alibi
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
