Feature: The Internet Guinea Pig Website

  @TCID:1 @smoke
  Scenario Outline: As a user, I can log into the secure area
    Given I am on the login page
    Then I login with "<username>" and "<password>" valid

    Examples:
      | username                     | password |            
      | prasannakumarpri20@gmail.com | Ucanseeme@1 | 

  @TCID:2 @smoke
  Scenario Outline: As a user, I can log into the secure area
    Given I am on the login page
    Then I login with "<username>" and "<password>" inValid

    Examples:
      | username                     | password |            
      | prasannakumarpri20@gmail.co  | Ucanseeme@1 | 

  @TCID:3 @smoke
  Scenario Outline: Switching windows
    Given I am on the login page
    Then Switching to new windows perfect
    Then I login with "<username>" and "<password>" valid
    Examples:
      | username                     | password |            
      | prasannakumarpri20@gmail.com | Ucanseeme@1 |

  @TCID:4 @smoke
  Scenario Outline: Switching to new windows perfect
      Given I am on the login page
      When Switching to new windows
      Then I login with "<username>" and "<password>" valid
    Examples:
      | username                     | password |            
      | prasannakumarpri20@gmail.com | Ucanseeme@1 |
      

  @TCID:5 @smoke
  Scenario Outline: Alert Pop-up
    Given Open a tab and verify alert

  @TCID:6 @smoke
  Scenario Outline: DropDown
    Given Open a tab and verify DropDown

  @TCID:7 @smoke
  Scenario Outline: Upload excel
    Given I upload file

  @TCID:8 @smoke
  Scenario Outline: Read Excel
    Given I Read file


  @HWID:1 @smoke
  Scenario Outline: Switching window
    Given Switching the windows HomeWork

  @HWID:2 @smoke
  Scenario Outline: Switching Iframe
    Given iframes HW

  @HWID:3 @smoke
  Scenario Outline: Switching Iframe
    Given iframes nested

  @HWID:4 @smoke
  Scenario Outline: Handling Broken links
    Given Handling brokenlinks
