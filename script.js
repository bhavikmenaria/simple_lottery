// Replace with your deployed contract address
const contractAddress = "0x99bfC313B7A0dCB77987f52C9EB23b1eA07CC63A";

// Contract ABI (Replace this with your actual ABI from Remix)
const contractABI = [
    {
        "inputs": [],
        "name": "enterLottery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pickWinner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPlayerCount",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "winner",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    }
];

async function connectMetaMask() {
    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is required!");
        return;
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("MetaMask Connected!");
}

async function enterLottery() {
    if (typeof ethers === "undefined") {
        console.error("Ethers.js is not loaded!");
        document.getElementById("status").innerText = "Ethers.js is missing!";
        return;
    }

    await connectMetaMask(); // Ensure MetaMask is connected

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const tx = await contract.enterLottery();
        document.getElementById("status").innerText = "Joining Lottery...";
        await tx.wait();
        document.getElementById("status").innerText = "Successfully joined!";
        updatePlayerCount();
    } catch (error) {
        console.error(error);
        document.getElementById("status").innerText = "Transaction failed!";
    }
}

async function pickWinner() {
    if (typeof ethers === "undefined") {
        console.error("Ethers.js is not loaded!");
        document.getElementById("status").innerText = "Ethers.js is missing!";
        return;
    }

    await connectMetaMask(); // Ensure MetaMask is connected

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const tx = await contract.pickWinner();
        document.getElementById("status").innerText = "Picking Winner...";
        await tx.wait();
        document.getElementById("status").innerText = "Winner selected!";
        updateWinner();
    } catch (error) {
        console.error(error);
        document.getElementById("status").innerText = "Transaction failed!";
    }
}

async function updatePlayerCount() {
    if (typeof window.ethereum === "undefined") {
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    try {
        const playerCount = await contract.getPlayerCount();
        document.getElementById("playerCount").innerText = playerCount;
    } catch (error) {
        console.error("Error fetching player count:", error);
    }
}

async function updateWinner() {
    if (typeof window.ethereum === "undefined") {
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    try {
        const winner = await contract.winner();
        document.getElementById("winner").innerText = winner;
    } catch (error) {
        console.error("Error fetching winner:", error);
    }
}

// Connect MetaMask on page load and update data
window.addEventListener("load", async () => {
    await connectMetaMask();
    await updatePlayerCount();
    await updateWinner();
});
