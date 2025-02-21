// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleLottery {
    address[] public players; // Stores player addresses
    address public winner; // Stores the selected winner

    // Function to enter the lottery
    function enterLottery() public {
        players.push(msg.sender); // Add sender to the list of players
    }

    // Function to randomly pick a winner (only for demo, not truly random)
    function pickWinner() public {
        require(players.length > 0, "No players joined"); // Ensure at least one player
        uint256 index = uint256(block.timestamp) % players.length; // Pseudo-random selection
        winner = players[index]; // Assign the winner
    }

    // Function to get total number of players
    function getPlayerCount() public view returns (uint256) {
        return players.length;
    }
}

