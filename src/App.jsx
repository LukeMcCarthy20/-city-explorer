import React from "react";
import "./App.css";
// Step 3
import axios from "axios";


const API_KEY = import.meta.env.VITE_API_KEY;
console.log(API_KEY);
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: "",
    };
  }

  // Step 2
  handleCityInput = (event) => {
    this.setState({
      cityName: event.target.value,
    });
  };

    // Step 4 
    // let location = await axios.get(


    // );

  // Step 5
  // this.setState({
  //   location: location.data.results,
  //   error: false,
  // });


render() {
  return (<>
    <h1>City Explorer</h1>
    {/* Step 1 */}
    <form onSubmit={this.handleSubmit}>
      <button type="submit">Explore!</button>

    </form>



  </>
  );
}
}

export default App;
