Feature: User Authentication and Interaction

Background: 
  Given User is logged into the website

Scenario: Successful Customer Login
  Then verify the user is logged in successfully
  And verify the API response for login is 200
