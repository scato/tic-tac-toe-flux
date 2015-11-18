Feature: start a game
  As a player
  I want to be able to start a game
  So that I can practice tic-tac-toe

  Scenario: choosing to go first
    When I choose to be player "X"
    Then I see an empty board

  Scenario: choosing to go second
    When I choose to be player "O"
    Then I see a board with 1 marked space

  Scenario: making the first move
    Given I choose to be player "X"
    When I mark the upper left space
    Then I see a board with 2 marked spaces
