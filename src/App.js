import 'bootstrap/dist/css/bootstrap.css';
import React ,{useState}from 'react';
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

  async function fetchData (e){
    e.preventDefault();
    const city = e.target.elements.city.value;
     const country = e.target.elements.country.value;

    const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=q=${city},${country}&appid=${API_key}`);
    const response = await weather.json();
    setFields(response);


  }


//useEffect(() => {
  //fetchData();

//},[]);


function calCelsius(temp){
    let cell = Math.floor(temp - 273.15);
    return cell;
    }



  //if (!fields.sys) {
    //  return (<div>Loading...</div>);
     // }



  return(
  <div className="App">
      <h1>Weather app</h1>

      <Form loadweather={fetchData} />

      <Weather
      city={fields.name}
      country={fields.country}
      temp_celsius={calCelsius(fields.main.temp)}
      temp_min={fields.temp_min}
      temp_max={fields.temp_max}
      description={fields.main}
      weatherIcon={fields.icon}
      />


    </div>
    );

}


export default App;



