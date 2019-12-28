import 'bootstrap/dist/css/bootstrap.css';
import React ,{useState, useEffect}from 'react';
import './App.css';
import Weather from './components/weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";


//const API_key = "b5014333f2554516a7172c05dbe90c57";

const App = ()=> {
  // settig the initial state
  const [city, setCity] = useState({});


  // making the API call

  async function fetchWeather() {
    const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`);
    const response = await weather.json();


    setCity(response);
  }

  useEffect(() => {
    fetchWeather();
  },[]);


  return (
    <div className="App">
      <h1>Weather app</h1>
      <Weather/>
    </div>
  );
}

export default App;
