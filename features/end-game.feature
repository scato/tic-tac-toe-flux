Feature: end a game
  As a player
  I want to be able to win, lose or draw a game
  So that the game doesn't last forever

  Scenario: winning the game
    Given I choose to be player "X"
    And I mark the lower right space
    And I mark the middle right space
    When I mark the upper right space
    Then I win the game

  Scenario: losing the game
  Scenario: drawing the game
