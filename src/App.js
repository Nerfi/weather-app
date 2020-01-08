import 'bootstrap/dist/css/bootstrap.css';
import React ,{useState, useEffect}from 'react';
import './App.css';
import Weather from './components/weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";
import Form from './components/form';


const API_key = "b5014333f2554516a7172c05dbe90c57";

const App = (props)=> {

  const [city, setCity] = useState([]);
  const [country, setCountry] = useState({}); // empty object as a initial state

  const [icon, setIcon] = useState([]);

  async function fetchCity(){
      //e.preventDefault(); not working
   // const city = e.target.elements.city.value; //Unhandled Rejection (TypeError): Cannot read property 'target' of undefined

    const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
    const response = await weather.json();

   setCity({
    city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: calCelsius(response.main.temp),
        temp_max: calCelsius(response.main.temp_max),
        temp_min: calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
   });

  }

  useEffect(() => {
    fetchCity();

  },[]);

// not sure if I need this or not
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



     //const weatherIcon = {
      //Thunderstorm: "wi-thunderstorm",
      //Drizzle: "wi-sleet",
      //Rain: "wi-storm-showers",
      //Snow: "wi-snow",
      //Atmosphere: "wi-fog",
      //Clear: "wi-day-sunny",
     // Clouds: "wi-day-fog"
     //}

     function get_WeatherIcon(icons,rangeId) {
      switch(true) {
        //check changes made here
        case rangeId >= 200 && rangeId < 232:
        setIcon({icon: icon.Thunderstorm});
        break;
        case rangeId >= 300 && rangeId <= 321:
        setIcon({icons: icons.Drizzle});
        break;
         case rangeId >= 500 && rangeId <= 521:
        setIcon({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        setIcon({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon({ icon: icons.Clouds });
        break;
        default:
        setIcon({icon: icons.Clouds});

      }

     }


    //check reddit answer for this if stament

      if (!country.sys) {
      return (<div>Loading...</div>);
      }


  return (
    <div className="App">
      <h1>Weather app</h1>

      <Form loadweather={fetchCity} />

      <Weather
      city={city.name}
      country={country.country}
      temp_celsius={city.celsius}
      temp_min={city.temp_min}
      temp_max={city.temp_max}
      description={city.main}
      weatherIcon={city.icon}
      />

    </div>
  );
}

export default App;
