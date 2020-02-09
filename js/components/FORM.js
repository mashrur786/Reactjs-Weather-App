import React from 'react';

const FORM = (props) => {
  return (
    <form>
        <input onChange={props.updateLocationHandler} type="text" value={props.location} placeholder="Location" />
        <button onClick={props.submitHandler} id="forecast"> Get Forecast </button>
    </form>
  )
};

export default FORM;
