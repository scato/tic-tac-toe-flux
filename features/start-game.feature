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
