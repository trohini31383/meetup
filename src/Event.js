import React, { Component } from 'react';


class Event extends Component {

  state = {
    showDetails: false

  }

  handleShowDetails = () => {

    if (this.state.showDetails === false) {

      this.setState({ showDetails: true });

    }

    else {

      this.setState({ showDetails: false });

    }

  }






  render() {
    const showDetails = this.state.showDetails;
    const event = this.props.event;
    return (

      <div className="event">
        <div className="event__Overview">
          <p className="event__Overview--name">{this.props.event.name}</p>

          <p className="event__Overview--localDate">{this.props.event.local_date}</p>

          <p className="event__Overview--groupName">{this.props.event.group.name}</p>

          {showDetails &&

            <button className="details-btn" onClick={() => this.handleShowDetails()}>hide details</button>

          }

          {!showDetails &&

            <button className="details-btn" onClick={() => this.handleShowDetails()}>show details</button>

          }


        </div>
        <div className="event__Details">

          <h3>Infos</h3>
          <h4><a href={this.props.event.link} target="blank">Visit MeetUp</a></h4>
          <p className="event__Details--description">{this.props.event.description}</p>
        </div>



      </div>
    );
  }
}



export default Event;