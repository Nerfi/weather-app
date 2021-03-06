
import React from 'react';


const Weather = (props) => {

  function minmaxTemp(min,max) {
  return(
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
      );
    }


  return(

    <div className="container text-light">
      <div className="cards pt-4">

      <h2 className="title">  {props.city} </h2>

      <h5 className="py-4">

        <i className={`wi ${props.weatherIcon && props.weatherIcon} display-1`} />
      </h5>

      <span className="py-2">{props.temp_celsius}&deg;</span>

      {/*  show min and max temp*/}

       {minmaxTemp(props.temp_min, props.temp_max)}

       <h3 className="py-3"> {props.description} </h3>

      </div>
    </div>
    );

}


export default Weather;
