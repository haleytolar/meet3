import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'; // Adjust the import based on your app structure

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppComponent;

    test('As a user I should be able to see 32 events shown by default if not specifying a number', ({ given, when, then }) => {
        given('the application is open', () => {
            AppComponent = render(<App />);
        });

        when('I view the list of events', async () => {
            await waitFor(() => {
                const AppDOM = AppComponent.container.firstChild;
                expect(AppDOM).toBeInTheDocument();
            });
        });

        then('I should see 32 events shown', async () => {
            await waitFor(() => {
                const AppDOM = AppComponent.container.firstChild;
                const EventListDOM = AppDOM.querySelector('#event-list');
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    test('As a user, I should be able to change the number of events displayed', ({ given, when, then }) => {
        given('the application is open and the events are shown', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            expect(EventListDOM).toBeInTheDocument();
        });

        when('the user specifies the events as 15', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
            const numberOfEventsInput = within(NumberOfEventsDOM).queryByRole('spinbutton');
            await user.type(numberOfEventsInput, '{backspace}{backspace}15');
        });

        then('only 15 events will be shown', async () => {
            await waitFor(() => {
                const AppDOM = AppComponent.container.firstChild;
                const EventListDOM = AppDOM.querySelector('#event-list');
                const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
                expect(allRenderedEventItems.length).toEqual(15);
            });
        });
    });
});
