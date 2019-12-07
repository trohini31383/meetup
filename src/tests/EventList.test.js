import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import Event from '../Event';

describe('<app /> component', () => {
  test('render correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />);
    EventListWrapper.setState({ events: [{}, {}, {}, {}] });
    expect(EventListWrapper.find(Event)).toHaveLength(4);
  });
});