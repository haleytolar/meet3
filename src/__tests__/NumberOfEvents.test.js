import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  beforeEach(() => {
    render(<NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />);
  });

  test('renders an element with the role of spinbutton', () => {
    const numberSpinbutton = screen.getByRole('spinbutton');
    expect(numberSpinbutton).toBeInTheDocument();
  });

  test('default value of input field is 32', () => {
    const numberSpinbutton = screen.getByRole('spinbutton');
    expect(numberSpinbutton).toHaveValue(32);
  });

  test('value changes when user types', async () => {
    const numberSpinbutton = screen.getByRole('spinbutton');
    const user = userEvent.setup();

    await user.clear(numberSpinbutton);
    await user.type(numberSpinbutton, '10');

    expect(numberSpinbutton).toHaveValue(10);
  });
});
