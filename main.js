/**
 * main.js
 * Clean implementation for Streamer.bot WebSocket connection
 */

// 1. Initialize the Streamer.bot client
// The host should be '127.0.0.1' (localhost) and the default port is 8080
const client = new StreamerbotClient({
    host: '127.0.0.1',
    port: 8080,
    immediate: true
});

// 2. Reference UI elements
const statusIndicator = document.getElementById('status-indicator');

/**
 * Event: Connected
 * Triggered when the socket successfully handshakes with Streamer.bot
 */
client.on('Connected', () => {
    console.log('Successfully connected to Streamer.bot WebSocket.');
    
    if (statusIndicator) {
        statusIndicator.innerText = 'Connected';
        statusIndicator.className = 'status-connected';
    }
});

/**
 * Event: Disconnected
 * Triggered if the connection is lost or the bot is closed
 */
client.on('Disconnected', () => {
    console.warn('Disconnected from Streamer.bot.');
    
    if (statusIndicator) {
        statusIndicator.innerText = 'Disconnected - Reconnecting...';
        statusIndicator.className = 'status-disconnected';
    }
});

/**
 * Event: Error
 * Useful for debugging connection refused or port issues
 */
client.on('Error', (err) => {
    console.error('WebSocket Error:', err);
});

/**
 * Example Subscription: Twitch Chat Message
 * You can add logic here to trigger animations or display text
 */
client.on('Twitch.ChatMessage', (data) => {
    const { displayName, message } = data.data;
    console.log(`[Twitch] ${displayName}: ${message}`);
    
    // Logic for your overlay (e.g., spawning a "Cube of Chat") would go here
});