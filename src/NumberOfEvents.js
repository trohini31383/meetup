import React, { Component } from 'react';
import App from './App';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {



  state = {

    numberOfEvents: 32,

    infoText: ''

  }



  handleInputChanged = (event) => {

    const value = event.target.value;

    this.setState({ numberOfEvents: value });

    if (value < 1) {

      this.setState({

        infoText: 'Number must be 1 or greater'

      });

    } else {

      this.setState({

        infoText: '',

      });

      this.props.
        updateEvents(null, null, value);


    }
  }

  render() {

    return (

      <div className="numberOfEvents">
        <ErrorAlert text={this.state.infoText} />

        <label>Number of Events: </label>

        <input

          type="text"

          id="numberOfEvents__input"

          value={this.state.numberOfEvents}

          onChange={this.handleInputChanged}

        />




      </div>

    );

  }

}



export default NumberOfEvents;



