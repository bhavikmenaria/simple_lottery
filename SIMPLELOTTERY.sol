
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleLottery {
    address[] public players; // List of participants in the lottery
    address public winner; // Address of the winner

    // Function to enter the lottery
    function enter() public payable {
        // Ensure the player sends exactly 0.1 ether to participate
        require(msg.value == 0.1 ether, "You must send exactly 0.1 ETH to enter.");

        // Add participant to the players array
        players.push(msg.sender);
    }

    // Function to select a winner randomly
    function selectWinner() public {
        // Ensure there are players in the lottery
        require(players.length > 0, "No players in the lottery.");

        // Generate a pseudo-random index for selecting a winner
        uint index = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, players))) % players.length;
        winner = players[index];

        // Reset the players array for the next round
        delete players;
    }

    // Function to get the winner's address
    function getWinner() public view returns (address) {
        return winner;
    }

    // Function to get the players count
    function getPlayersCount() public view returns (uint) {
        return players.length;
    }

    // Function to withdraw the funds by the winner
    function withdraw() public {
        // Ensure only the winner can withdraw
        require(msg.sender == winner, "Only the winner can withdraw the prize.");

        // Transfer the balance of the contract to the winner
        payable(winner).transfer(address(this).balance);
    }
}
