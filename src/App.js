import 'bootstrap/dist/css/bootstrap.css';
import React ,{useState, useEffect}from 'react';
import './App.css';
import Weather from './components/weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";
import Form from './components/form';


function App (props) {

const API_key = "b5014333f2554516a7172c05dbe90c57";

const [fields, setFields] = useState({city: '', country: ''});

const [icon, setIcon] = useState({
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
 });

  async function fetchData (){
   // e.preventDefault();
    const data = await fetch(`api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`);
    const response = await data.json();
    setFields(response);
  console.log(response);

  }

useEffect(() => {
  fetchData();

},[]);

  return(
    <div className="App">
    <h1>Weather app</h1>
    <Form loadweather={""}/>

    <Weather
    city={fields.name}
    country={fields.country}
    />

    </div>
    );

}


export default App;
