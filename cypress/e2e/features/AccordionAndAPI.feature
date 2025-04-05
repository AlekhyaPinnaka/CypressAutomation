Feature: User Authentication and Interaction

Background: 
  Given User is logged into the website

Scenario: Successful Customer Login
  Then verify the user is logged in successfully
  And verify the API response for login is 200

Scenario: Expanding Closed Accordions
  When User navigates to the accordion page
  Then User expands all closed accordions
  And verify the API response for accordion page is 200


Scenario: Verify Account Page API
    When User checks the API for account page response
    Then verify the API response status is 200 