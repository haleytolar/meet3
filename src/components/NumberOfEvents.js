import React from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const handleInputChanged = (event) => {
    const value = event.target.value;

   // Error handling
   let errorText = '';
   if (value <= 0) {
     errorText = "The number must be greater than 0";
   } else if (value > 32) { 
     errorText = "The number is too large";
   } else if (!Number.isInteger(Number(value))) {
     errorText = "The number must be an integer";
   } else {
     errorText = '';
   }

   setErrorAlert(errorText);
   if (!errorText) {
     setCurrentNOE(value);
   }
 };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="number"
        id="number-of-events-input"
        data-testid="number-of-events-input"
        className="number-of-events-input"
        defaultValue={32}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;