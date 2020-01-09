import 'bootstrap/dist/css/bootstrap.css';
import React ,{useState, useEffect, useReducer}from 'react';
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

//new state
const initialState = {city: '', country: '', icon: '' };
// new code
const reducer = (state, action) => {
  switch(action.type) {
    case 'cahnge_city':
    return{...state, city: action.type};
    default:
    return state;
  }

}

function App (props) {

const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchData (e){
   // e.preventDefault();
    const data = await fetch(`api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`);
    const response = await data.json();
    dispatch({type: 'response_api', data: response.data});
  console.log(response.data);

  }

useEffect(() => {

},[]);

  return(
    <div className="App">
    <h1>Weather app</h1>
    <Form/>

    <Weather
    city={state.city}
    country={state.country}
    />

    </div>
    );

}


export default App;
