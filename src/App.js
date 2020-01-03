import 'bootstrap/dist/css/bootstrap.css';
import React ,{useState, useEffect}from 'react';
import './App.css';
import Weather from './components/weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";


const API_key = "b5014333f2554516a7172c05dbe90c57";

const App = (props)=> {
  // settig the initial state

  const [city, setCity] = useState([]);
  const [country, setCountry] = useState({}); // empty object as a initial state

  // stiil need to add some more states
  const [icon, setIcons] = useState([]);
  const [main, setMain] = useState([]);
  // maybe I'll not need this
  //const [celcius, setCelcius] = useState([]);
  // maybe I'll not need this
 // const [temMax, setTemMax] = useState([]);
  const [temMin, setTemMin] = useState([]);
  const [description, setDescription] = useState("");
  // añdir error message pero ahora no


  async function fetchCity() {
    const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`);
    const response = await weather.json();

    setCity(response);


  }

  useEffect(() => {
    fetchCity();

  },[]);


    async function fetchCountry() {
    const country = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`);
    const response = await country.json();

    setCountry(response);

    console.log("response obt here",response);

  }
    useEffect(() => {
      fetchCountry();

    },[]);


    function calCelsius(temp){
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  //weather icon
  const weatherIcon = {
    Thunderstorm: "wi-thunderstorm"
  };

    //check reddit answer for this if stament

      if (!country.sys) {
      return (<div>Loading...</div>);
      }



  return (
    <div className="App">
      <h1>Weather app</h1>

      <Weather city={city.name}
      country={country.sys.country}
      temp_celsius={calCelsius(city.main.temp)}
      temp_min={calCelsius(city.main.temp_min)}
      temp_max={calCelsius(city.main.temp_max)}
      description={city.weather[0].description}
      weatherIcon={city.weather}
      />

    </div>
  );
}

export default App;
