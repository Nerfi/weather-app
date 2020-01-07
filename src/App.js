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

  // stiil need to add some more states
  const [icon, setIcons] = useState({icon:undefined, Loading: true});

  async function fetchCity(e){
      //e.preventDefault();
    const city = e.target.elements.city.value; //Unhandled Rejection (TypeError): Cannot read property 'target' of undefined

    const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
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



     const weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
     }

     function get_WeatherIcon(icons,rangeId) {
      switch(true) {
        case rangeId >= 200 && rangeId < 232:
        setIcons({icon: weatherIcon.Thunderstorm});
        break;
        case rangeId >= 300 && rangeId <= 321:
        setIcons({icons: icons.Drizzle});
        break;
         case rangeId >= 500 && rangeId <= 521:
        setIcons({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcons({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcons({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        setIcons({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcons({ icon: icons.Clouds });
        break;
        default:
        setIcons({icon: icons.Clouds});

      }

     }

    // get_WeatherIcon(setIcons);

    //check reddit answer for this if stament

      if (!country.sys) {
      return (<div>Loading...</div>);
      }


  return (
    <div className="App">
      <h1>Weather app</h1>

      <Form loadweather={""} />

      <Weather city={city.name}
      country={country.sys.country}
      temp_celsius={calCelsius(city.main.temp)}
      temp_min={calCelsius(city.main.temp_min)}
      temp_max={calCelsius(city.main.temp_max)}
      description={city.weather[0].description}
      weatherIcon={""}
      />

    </div>
  );
}

export default App;
