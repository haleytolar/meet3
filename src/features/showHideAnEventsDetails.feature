Feature: Show/Hide Event Details

  Scenario: As a user I should view an event element collapsed by default.
    Given the event application is open
    When I view the list of events
    Then each event element should be collapsed

  Scenario: As a user I should be able to expand an event to view the displayed details.
    Given The events application is open
    When I click on the event
    Then an extended page will show more details about the event

  Scenario: As a user I should be able to collapse an event to hide details.
    Given the events app is open and an event is showing details
    When the user clicks on the collapse button
    Then the details of that event should be hidden
