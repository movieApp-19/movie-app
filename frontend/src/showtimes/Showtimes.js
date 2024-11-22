import React, { Component } from 'react';
import './Showtimes.css';
import { getShowtimes } from './api';

const formatStartTime = (s) => {
  const t = new Date(s);
  const m = t.getMinutes();
  return `${t.getHours()}:${m === "0" ? "00" : m}`;
}

const formatRuntime = (s) => {
  const i = Number(s);
  return `${Math.floor(i/60)} h ${i%60} min`
}

export default class Showtimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theatreAreas: [],
      availableDates: [],
      showtimes: []
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

  handleSearch = async () => {
    const area = document.querySelector("#area").value;
    const date = document.querySelector("#date").value;
    if (area && date) {
      try {
        const showtimes = await getShowtimes(area, new Date(date));
        this.setState({ showtimes });
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      }
    }
  };

  render() {
    return (
      <>
        <div id="Showtimes">
          <h1>Finnkino Showtimes</h1>

          <select id="area" className="form-select form-select-lg mb-3" aria-label="Select Area/Theater">
            <option value="">Valitse alue/teatteri</option>
            {this.state.theatreAreas.map(area => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>

          <select id="date" className="form-select form-select-sm mb-3" aria-label="Select Date">
            <option value="">Valitse päivämäärä</option>
            {this.state.availableDates.map((date, index) => (
              <option key={index} value={date}>
                {new Date(date).toLocaleDateString('fi-FI')}
              </option>
            ))}
          </select>

          <button type="button" className="btn btn-outline-warning" onClick={this.handleSearch}>
            Search {'>>'}
          </button>
        </div>

        <div className="showtimes-list">
            {this.state.showtimes.length > 0 ? (
              this.state.showtimes.map(show => (
                <div key={show.id} className="showtime-item">
                  <h4>{show.title}</h4>
                  <p><strong>Starts:</strong> {formatStartTime(show.start)}</p>
                  <p><strong>Runtime:</strong> {formatRuntime(show.runtime)}</p>
                  <p><strong>Rating:</strong> {show.rating}</p>
                  <p><strong>Genres:</strong> {show.genres.join(', ')}</p>
                  <p><strong>Auditorium:</strong> {show.auditorium}</p>
                  <p><strong>Language:</strong> {show.language}</p>
                  <a href={show.eventURL} target="_blank" rel="noopener noreferrer">More Info</a>
                  <br />
                  <img src={show.portraitURL} alt={show.title} width="200" />
                </div>
              ))
            ) : (
              <p>No showtimes available.</p>
            )}
          </div>
      </>
    );
  }
}
