Feature: end a game
  As a player
  I want to be able to win, lose or draw a game
  So that the game doesn't last forever

  # . . X
  # O . X
  # O . X
  Scenario: winning the game
    Given I choose to be player "X"
    And I mark the lower right space
    And I mark the middle right space
    When I mark the upper right space
    Then I win the game

  # X . .
  # X . O
  # X . O
  Scenario: losing the game
    Given I choose to be player "O"
    And I mark the lower right space
    When I mark the middle right space
    Then I lose the game

  # O X X
  # X O O
  # O X X
  Scenario: drawing the game
    Given I choose to be player "X"
    And I mark the lower right space
    And I mark the middle left space
    And I mark the lower center space
    And I mark the upper center space
    And I mark the upper right space
    Then the game ends in a draw
