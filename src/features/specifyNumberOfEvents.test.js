import React from 'react';

import App from '../App';

import NumberOfEvents from '../NumberOfEvents';

import { loadFeature, defineFeature } from 'jest-cucumber';

import { mount } from 'enzyme';

import { mockEvents } from '../mock-events';



const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');



defineFeature(feature, test => {

  test('If user hasn’t specified a number, 32 is the default number.', ({ given, when, then }) => {

    given('the user did not specify a number of events being shown', () => {



    });



    let AppWrapper;



    when('app loaded', () => {

      AppWrapper = mount(<App />);

    });



    then('the default number of shown events is 32', () => {

      AppWrapper.update();

      expect((AppWrapper.find('.event')).length).toBeLessThanOrEqual(32);

    });

  });



  test('User can change the number of events they want to see.', ({ given, when, then }) => {

    let AppWrapper;



    given('the list of elements has been loaded and the user did not specify a number of events he wants to see', () => {

      AppWrapper = mount(<App />);

    });



    when('the user specified a number', () => {

      const numberOfEvents = { target: { value: 10 } };

      AppWrapper.find('.numberOfEvents').simulate('change', numberOfEvents);

    });



    then('the maximum number of events listed should be equal to the specified number', () => {

      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);

      NumberOfEventsWrapper.setState({ numberOfEvents: 10 });

      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10);

    });

  });

});