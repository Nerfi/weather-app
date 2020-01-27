import 'bootstrap/dist/css/bootstrap.css';
import React ,{useState}from 'react';
import './App.css';
import Weather from './components/weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";
import Form from './components/form';


function App () {

const API_key = "5dca448e69234b2a6a26f52ed3883a47";

const [fields, setFields] = useState({city: '', country: ''});

const [icon, setIcon] = useState({});

const iconss = {

      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
}

//setting up  icons
  function weatherIcon(icons, rangeId) {
    switch (true){
      case rangeId >= 200 && rangeId < 232:
      setIcon({ icon: icons.Thunderstorm });
      break;
      case rangeId >= 300 && rangeId <= 321:
      setIcon({icon: icons.Drizzle})
      break;
      case rangeId >= 500 && rangeId <= 521:
      setIcon({icon: icons.Rain })
      break;
      case rangeId >= 600 && rangeId <= 622:
      setIcon({ icon: icons.Snow})
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
      setIcon({ icon: icons.Clouds });

    }
  }


  async function fetchData(e) {

        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

     try{

      if(country && city){

          const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
          const response = await weather.json();

          setFields({
              city: `${response.name}, ${response.sys.country}`,
              country: response.sys.country,
              main: response.weather[0].main,
              celsius: calCelsius(response.main.temp),
              temp_max: calCelsius(response.main.temp_max),
              temp_min: calCelsius(response.main.temp_min),
              description: response.weather[0].description,
              icon: weatherIcon(response.weather[0].id),
              error: false
              })


           weatherIcon(iconss,response.weather[0].id);


       } else {
        alert("City and Country are required");
       }


     }
     catch(error){
      console.log(error && error);

     }
  }


// aqui esto no procede porque no estamos cargando data una vez el componentDidMount, aqui esperamos a realizar una accion para cargar los datos,
// no al principio cuando se ha montado el component
//useEffect(() => {
  //fetchData();

//},[]);


  const calCelsius = (temperatura) => Math.floor(temperatura - 273.15);

  return(

  <div className="App">
      <h1>Weather app</h1>

      <Form loadweather={fetchData} />


      <Weather
      city={fields.city}
      country={fields.country}
      temp_celsius={fields.celsius}
      temp_min={fields.temp_min}
      temp_max={fields.temp_max}
      description={fields.description}
      weatherIcon={fields.icon}

      />


    </div>
    );

}


export default App;



