import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor } from '@testing-library/react';
import App from '../App';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    let view;

    test('As a user I should view an event element collapsed by default.', ({ given, when, then }) => {
        given('the event application is open', () => {
            view = render(<App />);
        });

        when('I view the list of events', () => {
            // No user interaction required, simply viewing the list of events
        });

        then('each event element should be collapsed', async () => {
            await waitFor(() => {
                const eventDetails = view.container.querySelector('.details');
                expect(eventDetails).not.toBeInTheDocument();
            });
        });
    });

    test('As a user I should be able to expand an event to view the displayed details.', ({ given, when, then }) => {
        let EventComponent;
        let allEvents;

        given('The events application is open', async () => {
            allEvents = await getEvents();
            EventComponent = render(<Event event={allEvents[0]} />);
            expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
        });

        when('I click on the event', async () => {
            const showDetails = EventComponent.getByText('Show Details');  
            const user = userEvent.setup();
            await user.click(showDetails);
        });

        then('an extended page will show more details about the event', async () => {
            await waitFor(() => {
                expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
                expect(EventComponent.getByText('Hide Details')).toBeInTheDocument();  
            });
        });
    });

    test('As a user I should be able to collapse an event to hide details.', ({ given, when, then }) => {
        let EventComponent;
        let allEvents;

        given('the events app is open and an event is showing details', async () => {
            allEvents = await getEvents();
            EventComponent = render(<Event event={allEvents[0]} />);
            const user = userEvent.setup();
            await user.click(EventComponent.getByText('Show Details'));  
            await waitFor(() => {
                expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
            });
        });

        when('the user clicks on the collapse button', async () => {
            const hideDetails = EventComponent.getByText('Hide Details');  
            const user = userEvent.setup();
            await user.click(hideDetails);
        });

        then('the details of that event should be hidden', async () => {
            await waitFor(() => {
                expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
                expect(EventComponent.queryByText('Hide Details')).not.toBeInTheDocument();  
            });
        });
    });
});
