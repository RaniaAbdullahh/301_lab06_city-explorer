
import './App.css';
import React from 'react';
import axios from 'axios';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      locationResult: {},
      searchQuery: ''
    }
  }
getLocFun= async (e) => {
    e.preventDefault();
    console.log('inside getLocFun')

    await this.setState({
      searchQuery: e.target.city.value
    })
    console.log(this.state.searchQuery)

    let reqUrl=  `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
    let locRes = await axios.get(reqUrl)
    console.log(locRes.data)

    this.setState({
      locationResult: locRes.data[0],
     
    })
    console.log(this.state.locationResult.lat,this.state.locationResult.lon)
}

render() {
  return (
    <div>
    <h3>City Explorer app</h3>
  
    <form onSubmit={this.getLocFun}>
      <input type="text" name='city' />
      <input type="submit" value='"Explore!' />
    </form>
   
    <p>City name: {this.state.locationResult.display_name}</p>
    <p>latitude: {this.state.locationResult.lat}</p>
    <p>latitude: {this.state.locationResult.lon}</p>
    <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center= ${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=18`} alt="city" />
   
    </div>
  );
  }
}
export default App;
