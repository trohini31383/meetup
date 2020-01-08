import React, { Component } from 'react';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import moment from 'moment';
import { OfflineAlert } from './Alert';
import { getEvents } from './api';
import './App.css';
import {

  ScatterChart,

  Scatter,

  XAxis,

  YAxis,

  CartesianGrid,

  Tooltip,

  ResponsiveContainer

} from 'recharts';




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

  countEventsOnADate = date => {

    let count = 0;

    for (let i = 0; i < this.state.events.length; i += 1) {

      if (this.state.events[i].local_date === date) {

        count += 1;

      }

    }

    return count;

  };

  getData = () => {

    const next7Days = []; // Create empty array for the next 7 days

    const currentDate = moment(); // Today

    // Loop 7 times for next 7 days

    for (let i = 0; i < 7; i += 1) {

      currentDate.add(1, 'days'); // Add 1 day to current date, currentDate changes

      const dateString = currentDate.format('YYYY-MM-DD'); // Format the date

      // Use the countEventsOnADate function to count #events on this date

      const count = this.countEventsOnADate(dateString);

      next7Days.push({ date: dateString, number: count }); // Add this date and number to the list

    }

    return next7Days;

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



        <ScatterChart

          width={400}

          height={400}

          margin={{

            top: 20, right: 20, bottom: 20, left: 20,

          }}

        >

          <CartesianGrid />

          <XAxis type="category" dataKey="date" name="date" />

          <YAxis type="number" dataKey="number" name="number of events" />

          <Tooltip cursor={{ strokeDasharray: '3 3' }} />

          <Scatter data={this.getData()} fill="#8884d8" />

        </ScatterChart>




        <EventList events={this.state.events} />

      </div>
    );
  }
}


export default App;