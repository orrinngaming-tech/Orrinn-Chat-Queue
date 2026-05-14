/**
 * main.js - Streamer Dashboard Logic
 */

// Initialize the Streamer.bot client to connect to your local machine
const client = new StreamerbotClient({
    host: '127.0.0.1',
    port: 8080,
    immediate: true
});

const statusIndicator = document.getElementById('status-indicator');

// Handle Successful Connection
client.on('Connected', () => {
    console.log('Successfully connected to Streamer.bot');
    if (statusIndicator) {
        statusIndicator.innerText = 'Connected';
        statusIndicator.style.color = '#00ff00'; // Green for success
    }
});

// Handle Disconnection
client.on('Disconnected', () => {
    console.warn('Disconnected from Streamer.bot');
    if (statusIndicator) {
        statusIndicator.innerText = 'Connecting to Streamer.bot...';
        statusIndicator.style.color = '#ff4444'; // Red for disconnected
    }
});

// Example: Listen for Twitch Chat Messages to populate your columns
client.on('Twitch.ChatMessage', (data) => {
    const { displayName, message } = data.data;
    
    // Log to console for debugging
    console.log(`New message: ${displayName}: ${message}`);
    
    // Logic to update your "LIVE CHAT" column could go here
    const chatArea = document.getElementById('live-chat');
    if (chatArea) {
        const msgElement = document.createElement('p');
        msgElement.innerHTML = `<strong>${displayName}:</strong> ${message}`;
        chatArea.prepend(msgElement);
    }
});