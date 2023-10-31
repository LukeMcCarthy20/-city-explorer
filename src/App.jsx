import React from "react";
import "./App.css";
import axios from "axios";
import Weather from './Weather';

const API_KEY = import.meta.env.VITE_API_KEY;
let VITE_APP_SERVER = import.meta.env.VITE_APP_SERVER;
console.log(API_KEY);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lon: '',
      locationName: '',
      weather: '',
      showWeather: false,
      displayImage: false,
      error: false,
      movies: '',

    };
  }

  handleCityInput = (event) => {
    this.setState({
      cityName: event.target.value,
    });
  };

  handleCityFormSubmit = async (event) => {
    event.preventDefault();
    console.log("city name?", this.state.cityName);
    console.log(API_KEY);
    let URL = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.cityName}&format=json`;

    let cityInfo = await axios.get(URL);

    console.log("city info: ", cityInfo.data[0]);

    this.setState({
      locationName: cityInfo.data[0].display_name,
      lat: cityInfo.data[0].lat,
      lon: cityInfo.data[0].lon,



      displayImage: true,
      error: false,
    });

    console.log("Latitude:", cityInfo.data[0].lat);
    console.log("Longitude:", cityInfo.data[0].lon);
    this.displayWeather(cityInfo.data[0].lat, cityInfo.data[0].lon, cityInfo.data[0].display_name);
  };

  displayWeather = async (lat, lon, locationName) => {
    console.log(lat, lon, locationName, 'displaying weather');

    try {
      const weather = await axios.get(`${VITE_APP_SERVER}/weather`, { params: { lat: lat, lon: lon, locationName: locationName } });
      console.log('weather from server', weather);
      this.setState({
        weather: weather.data,
        showWeather: true
      })
    } catch (error) {
      console.log(error);
    }
  }




  render() {

    return (
      <>
        <h1>World Explore</h1>
        <form onSubmit={this.handleCityFormSubmit}>
          <label>
            Pick a City:
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit"> Get City Data</button>
        </form>
        {
          this.state.showWeather &&
          <div>
            <p>Latitude: {this.state.lat}</p>
            <p>Longitude: {this.state.lon}</p>

            <Weather weather={this.state.weather} />

          </div>
        }


        {this.state.displayImage &&


          <img
            src={`https://maps.locationiq.com/v3/staticmap?key=pk.366fea80da4817b70fc2d981b40b1718&center=${this.state.lat},${this.state.lon}&size=${window.innerWidth}x300&format=jpg&zoom=16`}
            alt={`Map of ${this.state.locationName}`}
          />

        }

      </>
    );
  }
}

export default App;