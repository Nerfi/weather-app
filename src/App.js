import 'bootstrap/dist/css/bootstrap.css';
import React ,{useState, useEffect}from 'react';
import './App.css';
import Weather from './components/weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";
import Form from './components/form';


const API_key = "b5014333f2554516a7172c05dbe90c57";

const icons = {
  Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
}


function App (props) {
  const [fields, setFields] = useState({city: '', country: '', icon: ''});

  async function fetchData (e){
    e.preventDefaukt();// not seems to be working
    const data = await fetch(`api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`);
    const response = await data.json();

  }


  return(
    <div>
    <Form/>
    </div>
    );

}


export default App;
