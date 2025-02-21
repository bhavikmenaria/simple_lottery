# Simple Lottery Smart Contract

This is a basic lottery smart contract written in Solidity. It allows users to participate in a lottery by sending exactly 0.1 ETH. The contract randomly selects a winner, and the winner can withdraw the prize.

## Features

- **Entry**: Players can enter the lottery by sending exactly 0.1 ETH.
- **Random Winner Selection**: The winner is selected using a pseudo-random method based on the block timestamp and difficulty.
- **Winner Withdrawal**: The winner can withdraw the total prize from the contract.
- **No input required during deployment**: The contract does not need any input fields during deployment.

## Contract Overview

- `enter()`: Allows users to enter the lottery by sending exactly 0.1 ETH.
- `selectWinner()`: Selects a random winner from the players and resets the players list for the next round.
- `getWinner()`: Returns the winner's address.
- `getPlayersCount()`: Returns the number of players currently in the lottery.
- `withdraw()`: Allows the winner to withdraw the prize from the contract.

## Contract Code

```solidity
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
```


## License
This project is licensed under the MIT License.
