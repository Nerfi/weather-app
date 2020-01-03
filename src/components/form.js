import React from 'react';
import './form.style.css';

const Form = props => {
  return(
    <div className="container">
    <form onSubmit={props.loadweatehr}>
      <div className="row">
        <div className="col-md-3 offset-md-2">
        <input type="text"
        className="form-control"
        placeholder="city"
        name="city"
        autoComplete="off"/>

        </div>
        <div className="col-md-3">
          <input type="text"
          className="form-control"
          placeholder="country"
          name="country"
          autoComplete="off" />

        </div>
        <div className="col-md-3 mt-md-0 text-md-left">
          <button className="btn btn-warning"> Get Weather</button>
        </div>

      </div>
    </form>

    </div>
    );
};

export default Form;
