import React, { Component } from 'react';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { WarningAlert, OfflineAlert } from './Alert';
import { getEvents } from './api';
import './App.css';




class App extends Component {
  componentDidMount() {

    getEvents().then(response => this.setState({ events: response }));
    window.addEventListener('online', this.offLineAlert());

  }



  state = {
    events: [],
    page: null,
    lat: null,
    lon: null,
    warningText: ''
  };

  offLineAlert = () => {

    if (navigator.onLine === false) {

      this.setState({

        warningText: 'You appear to be offline, this list is cached. Please connect to the internet for an updated list.'

      });

    } else {

      this.setState({

        warningText: '',

      });

    }

  }

  updateEvents = (lat, lon, page) => {

    //if (!navigator.onLine) {

    //this.setState({ warningText: 'No Network Connection! Event list loaded from last session.' });

    //} else {

    // this.setState({ warningText: '' });

    //}
    if (lat && lon) {

      getEvents(lat, lon, this.state.page).then(response =>

        this.setState({ events: response, lat, lon })

      );

    } else if (page) {

      getEvents(this.state.lat, this.state.lon, page).then(response =>

        this.setState({ events: response, page })

      );

    } else {

      getEvents(this.state.lat, this.state.lon, this.state.page).then(

        response => this.setState({ events: response })

      );

    }

  };



  render() {
    return (
      <div className="App">
        <h3>Checkout some cool events happening in your city !!</h3>
        <OfflineAlert text={this.state.warningText} />

        <CitySearch updateEvents={this.updateEvents} />

        <NumberOfEvents
          updateEvents={this.updateEvents}

          numberOfEvents={this.state.events.length}

          lat={this.state.lat}

          lon={this.state.lon}
        />


        <EventList events={this.state.events} />

      </div>
    );
  }
}


export default App;