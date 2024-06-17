Feature: Specify Number of Events

Scenario: As a user I should be able to see 32 events shown by default if not specifying a number
  Given the application is open
  When I view the list of events
  Then I should see 32 events shown

Scenario: As a user, I should be able to change the number of events displayed
  Given the application is open and the events are shown
  When the user specifies the events as 15
  Then only 15 events will be shown
