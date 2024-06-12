import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
  let EventComponent;
  let event; // Define a variable to hold the event data

  beforeEach(async () => {
    const allEvents = await getEvents();
    event = allEvents[0]; // Assign the first event to the event variable
    EventComponent = render(<Event event={event} />);
  });

  test('renders event title', () => {
    expect(screen.queryByText(event.summary)).toBeInTheDocument();
  });

  test('renders event start time', () => {
    expect(EventComponent.queryByText(event.created)).toBeInTheDocument();
  });

  test('renders event location', () => {
    expect(screen.queryByText(event.location)).toBeInTheDocument();
  });

  test('renders event details button', () => {
    expect(screen.queryByText('Show Details')).toBeInTheDocument();
  });

  test("renders hidden event's details section by default", () => {
    expect(screen.queryByText(event.description)).not.toBeInTheDocument();
  });

  test('renders show details section when user clicks button', async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByText('Show Details');
    await user.click(button);
    const details = EventComponent.container.querySelector('.details');
    expect(details).toBeInTheDocument();
  });

  test('hides details section when user clicks button', async () => {
    const user = userEvent.setup();
    const showButton = EventComponent.queryByText('Show Details');
    await user.click(showButton);
    const hideButton = EventComponent.queryByText('Hide Details');
    await user.click(hideButton);
    expect(screen.queryByText('Show Details')).toBeInTheDocument();
    expect(screen.queryByText('Hide Details')).not.toBeInTheDocument();
  });
});