import React from 'react';
import ReactDOM from 'react-dom';
import "./../css/normalize.css";
import "./../css/main.css";
import "./../css/app.css";
import backgroundImg from './../img/clear-cloud.jpg';
import {CSSTransition} from "react-transition-group";
import FORM from './components/FORM'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      hasResult : false,
      location : '',
      weather : '',
      description : '',
      temp : '',
      icon : '',
      backgroundImg: ''

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateLocation = this.updateLocation.bind(this);

  }

  componentDidMount() {
      this.setState({'backgroundImg' : backgroundImg}) ;
  }



  handleSubmit(e) {

      e.preventDefault();

      const openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
      const openWeatherApiKey = '7104ed9d1bda0cd274229cbac5398b4f';
      let location =  this.state.location;

      const pixelBayUrlBase = 'https://pixabay.com/api/?key=';
      const pixelBayApiKey = '15198328-d7fc5004f673554b87d5069ee';



      fetch( openWeatherUrl+location+'&APPID='+ openWeatherApiKey)
         .then((resp) => resp.json())
         .then((data) => {
           this.setState({

              hasResult : true,
              location : this.state.location.charAt(0).toUpperCase() + this.state.location.slice(1),
              weather: data.list[0].weather[0].main,
              Description: data.list[0].weather[0].description,
              temp: data.list[0].main.temp,
              icon: data.list[0].weather[0].icon

           });

           console.log(pixelBayUrlBase+pixelBayApiKey+'&q='+location+'&image_type=photo&pretty=true&orientation=horizontal&category=places');
           return fetch(pixelBayUrlBase+pixelBayApiKey+'&q='+location+'+city&image_type=photo&pretty=true&orientation=horizontal');
        })
        .then((resp) => resp.json())
        .then((data) => {

          let image = data.hits[0].largeImageURL;
          this.setState({backgroundImg : image});

        })
        .catch((error) => {
            console.log(error);
          }
        );

  }

  updateLocation(e) {
      this.setState({
        location : e.target.value,
      });
  }

  tempConversion(u) {
    return (parseFloat(u) - 273.15).toFixed(2);
  }

  render(){



       return (
           <div className="ui-container">
              <CSSTransition
                in={true}
                appear={true}
                timeout={1000}
                classNames="fade"
              >
                <img src={this.state.backgroundImg} alt=""/>
              </ CSSTransition>
              <small> by Mashrur </small> <br/>
              <h1> Weather APP <small>v1</small></h1>
             <FORM updateLocationHandler={ this.updateLocation } locationValue={ this.location } submitHandler={ this.handleSubmit } />
             { this.state.hasResult &&
               <div className="result">
                 <h3>{this.state.location}</h3>
                 <img src={'http://openweathermap.org/img/wn/' + this.state.icon + '@2x.png'} alt=""/>
                 <p>
                   { this.state.weather.toUpperCase() } / {this.tempConversion(this.state.temp)}
                 </p>
               </div>
             }
         </div>
       )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


