import React from "react";
import "./App.css";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
console.log(API_KEY);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      cityName: "",
      cityInfo: null,
      displayImage: false,

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
    try {
      let URL = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.cityName}&format=json`;

      let cityInfo = await axios.get(URL);

      console.log("city info: ", cityInfo.data[0]);

      this.setState({
        cityInfo: cityInfo.data[0],
        displayImage: true,
        error: false,
      });

    } catch (error) {
      prompt('error trying to grab data')
      this.setState({
        error: true
      });
    }

    };



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
          {this.state.cityInfo && (
            <>
              <p>{this.state.cityInfo.display_name}</p>
              <p>{this.state.cityInfo.lat}</p>
              <p>{this.state.cityInfo.lon}</p>
              {/* <p>{this.state.cityInfo.data[0].weather.description}</p> */}
            </>
          )}
          {this.state.displayImage &&
          
          
          <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.366fea80da4817b70fc2d981b40b1718&center=47.60621,-122.33207&size=${window.innerWidth}x300&format=jpg&zoom=16`}/>
          }

        </>
      );
    }
  }

export default App;