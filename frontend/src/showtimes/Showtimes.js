import React, { Component } from 'react';
import './Showtimes.css';

export default class Showtimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theatreAreas: [],
      availableDates: [],
    };
  }

  componentDidMount() {
    fetch('https://www.finnkino.fi/xml/TheatreAreas/')
      .then(response => response.text())
      .then(str => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, 'text/xml');
        const theatreAreas = Array.from(xmlDoc.getElementsByTagName('TheatreArea')).map(area => ({
          id: area.getElementsByTagName('ID')[0].textContent,
          name: area.getElementsByTagName('Name')[0].textContent,
        }));
        
        const cleanedTheatreAreas = theatreAreas.filter(area => area.name !== 'Valitse alue/teatteri');
        this.setState({ theatreAreas: cleanedTheatreAreas });
      })
      .catch(error => {
        console.error('Error loading the Theatre Areas XML:', error);
      });

    fetch('https://www.finnkino.fi/xml/ScheduleDates/')
      .then(response => response.text())
      .then(str => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, 'text/xml');
        const dates = Array.from(xmlDoc.getElementsByTagName('dateTime')).map(date => date.textContent);
        
        this.setState({ availableDates: dates });
      })
      .catch(error => {
        console.error('Error loading the Dates XML:', error);
      });
  }

  render() {
    return (
      <>
        <div id="Showtimes">
          <h1>Finnkino Showtimes</h1>

          <select className="form-select form-select-lg mb-3" aria-label="Select Area/Theater">
            <option value="">Valitse alue/teatteri</option>
            {this.state.theatreAreas.map(area => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>

          <select className="form-select form-select-sm mb-3" aria-label="Select Date">
            <option value="">Valitse päivämäärä</option>
            {this.state.availableDates.map((date, index) => (
              <option key={index} value={date}>
                {new Date(date).toLocaleDateString('fi-FI')}
              </option>
            ))}
          </select>

          <button type="button" className="btn btn-outline-warning">
            Search {'>>'}
          </button>
        </div>
      </>
    );
  }
}
