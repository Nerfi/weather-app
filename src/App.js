import 'bootstrap/dist/css/bootstrap.css';
import React ,{useState}from 'react';
import './App.css';
import Weather from './components/weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";
import Form from './components/form';


function App () {

const API_key = "5dca448e69234b2a6a26f52ed3883a47";

const [fields, setFields] = useState({city: 'Madrid', country:''});

const [icon, setIcon] = useState({
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
 });


  async function fetchData(e) {

        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

     try{

      if(country && city){

          const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
          const response = await weather.json();
          console.log(response, "response is here");

          setFields({
              city: `${response.name}, ${response.sys.country}`,
              country: response.sys.country,
              main: response.weather[0].main,
              celsius: calCelsius(response.main.temp),
              temp_max: calCelsius(response.main.temp_max),
              temp_min: calCelsius(response.main.temp_min),
              description: response.weather[0].description,
              error: false
              })

          console.log(response.data, "data is here");

       } else {
        alert("City and Country are required");
       }


     }
     catch(error){
      console.log(error && error);

     }
  }

//if(fields.data == undefined) {
  //console.log("undefined data is render");
//}



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



