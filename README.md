#Meet App

Features and scenarios:

Feature 1: Filter Events By City

#1 As a user, I should be able to choose a city from a list of suggestions so that I can see the upcoming events in that city.

Given the user has not selected a city When viewing the list of upcoming events Then the user should see a list of upcoming events.

#2 As a user, I should be able to toggle event details so that I can control the displayed information.

Given the main page is open; When user types their city in the search bar Then the user should receive a list of related cities (suggestions).

#3 As a user, I should be able to select a city from the suggested list.

Given The user was typing “Nashville” in the city textbox and a suggested list of cities is shown When user selects the city (Nashville) from the suggested list Then the city (Nashville) will be selected from the list and the user should receive a list of upcoming events in that city.

Feature 2: Show/Hide Event Details

#1 As a user I should view an event element collapsed by default.

Given the event application is open When I view the list of events Then each event element should be collapsed

#2 As a user I should be able to expand an event to view the displayed details.

Given The events application is open When I click on the event Then an extended page will show more details about the event

#3 As a user I should be able to collapse an event to hide details.

Given the events app is open and an event is showing details When the user clicks on the collapse button Then the details of that event should be hidden

Feature 3: Specify Number of Events

#1 As a user I should be able to see 32 events shown by default if not specifying a number

Given the application is open When I view the list of events Then I should see 32 events shown

#2 As a user, I should be able to change the number of events displayed.

Given the application is open and the events are shown When the user specifies the events as 15 Then only 15 events will be shown

Feature 4: Use the App When Offline

#1 As a user, I should see cached data without an internet connection.

Given the events app is open and there is no internet connection When I view the list of events Then I should see cached event data

#2 As a user, I should see an error when I change search settings (city, number of events).

Given the events app is open and there is no internet connection When the user attempts to change the search settings Then the user should view an error message

Feature 5: Add an App Shortcut to the Home Screen

#1 As a user, I should be able to install the meet app as a shortcut on my device home screen.

Given the user has the app open When the user selects the display to add the app to their home screen Then a shortcut to the meet app should be added to the device home screen

Feature 6: Display Charts Visualizing Event Details

#1 As a user, I should be shown a chart with the number of upcoming events in each city.

Given the event application is open When I route to the charts section Then I should see a chart displaying the number of upcoming events in each city

The use of serverless functions:

The Meet app leverages serverless functions to manage backend tasks, eliminating the need for maintaining server infrastructure. These functions retrieve and handle data from the database to gather details about upcoming events or narrow down events by city. This design ensures that event details are easily accessible while maintaining scalability, cost-effectiveness, and efficient resource allocation and enables effortless access to event details irrespective of the user's location or network status.
