import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
    let AppComponent;

    test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        given('the user has not selected a city', () => {
            // No action needed for this step
        });

        when('viewing the list of upcoming events', () => {
            AppComponent = render(<App />);
        });

        then('the user should see a list of upcoming events.', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
      
            await waitFor(() => {
              const EventListItems = within(EventListDOM).queryAllByRole('listitem');
              expect(EventListItems.length).toBe(32);
            });
        });
    });

    test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
        given('the main page is open;', () => {
            AppComponent = render(<App />);
        });

        let CitySearchDOM;
        when('user types their city in the search bar', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            const citySearchInput = within(CitySearchDOM).queryByRole('textbox');  
            await user.type(citySearchInput, "Berlin");
        });

        then('the user should receive a list of related cities (suggestions).', async () => {
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
             expect(suggestionListItems).toHaveLength(2);
        });
    });

    test('User can select a city from the suggested list.', ({ given, and, when, then }) => {

        let AppComponent;
        let AppDOM; 
        let CitySearchDOM;
        let citySearchInput;
        given('The user was typing “Berlin” in the city textbox', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            citySearchInput = within(CitySearchDOM).queryByRole('textbox');  
            await user.type(citySearchInput, "Berlin");

        });

        let suggestionListItems;
        and('a suggested list of cities is shown', () => {
            suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
            expect(suggestionListItems).toHaveLength(2);
    
        });

        when('user selects the city (“Berlin”) from the suggested list', async () => {
            const user = userEvent.setup();
            await user.click(suggestionListItems[0]);
        });

        then('the city (Berlin) will be selected from the list', () => {
            expect(citySearchInput.value).toBe('Berlin, Germany');
        });

        and('the user should receive a list of upcoming events in that city.', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            const allEvents = await getEvents();
            const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value)
      expect(EventListItems).toHaveLength(berlinEvents.length);
        });
      
        });
    });

    
