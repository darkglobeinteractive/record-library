import React from 'react';

// This is simply a loading screen
const Spinner = props => {
  return (
    <div id="spinner" className="ui segment">
      <div className="ui active inverted dimmer">
        <div className="ui text loader">{props.message}</div>
      </div>
      <p></p>
    </div>
  );
}

export default Spinner;
