import React, { Component } from 'react';

class Planet extends Component {
  render() {
      var data = this.props.planet;
      var fontsize={
          fontSize:"12px"
      };
    return (
     <div className="planet" style={fontsize}>
        <div className="planetInfo">
            <p> Name: {data.name} </p>
            <p> Population: {data.population} </p>
            <p> Diameter: {data.diameter} </p>
            <p> Terrian: {data.terrian} </p>
            <p> Gravity: {data.gravity} </p>
         </div>
    </div>
    );
  }
}

export default Planet;
