Feature: Filter events by city

 Scenario: When user hasn’t searched for a city, show upcoming events from all cities.
    Given the user has not selected a city
    When viewing the list of upcoming events
    Then the user should see a list of upcoming events.

 Scenario: User should see a list of suggestions when they search for a city.
    Given the main page is open;
    When user types their city in the search bar
    Then the user should receive a list of related cities (suggestions).

 Scenario: User can select a city from the suggested list.
    Given The user was typing “Berlin” in the city textbox 
    And a suggested list of cities is shown
    When user selects the city (“Berlin”) from the suggested list
    Then the city (Berlin) will be selected from the list 
    And the user should receive a list of upcoming events in that city.

