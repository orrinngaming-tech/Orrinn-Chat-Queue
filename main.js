/**
 * main.js - Streamer Dashboard Logic
 * Corrected for v1.x event naming
 */

const client = new StreamerbotClient({
    host: '127.0.0.1',
    port: 8080,
    immediate: true
});

const statusIndicator = document.getElementById('status-indicator');

// The library uses lowercase 'connected' and 'disconnected'
client.on('connected', () => {
    console.log('Successfully connected to Streamer.bot');
    if (statusIndicator) {
        statusIndicator.innerText = 'Connected';
        statusIndicator.style.color = '#00ff00'; 
    }
});

client.on('disconnected', () => {
    console.warn('Disconnected from Streamer.bot');
    if (statusIndicator) {
        statusIndicator.innerText = 'Connecting to Streamer.bot...';
        statusIndicator.style.color = '#ff4444';
    }
});

// Subscription for Twitch messages
client.on('Twitch.ChatMessage', (data) => {
    const { displayName, message } = data.data;
    const chatArea = document.getElementById('live-chat');
    if (chatArea) {
        const msgElement = document.createElement('p');
        msgElement.innerHTML = `<strong>${displayName}:</strong> ${message}`;
        chatArea.prepend(msgElement);
    }
});