const chatArea = document.getElementById('chat-area');
const messageInput = document.getElementById('message-input');

function formatMessage(msg) {
    return `<div class="message sender-${msg.sender.toLowerCase()}">
                <div class="timestamp">${msg.timestamp}</div>
                <div>${msg.message}</div>
            </div>`;
}

function updateChatArea(messages) {
    chatArea.innerHTML = messages.map(formatMessage).join('');
    chatArea.scrollTop = chatArea.scrollHeight;
}

function fetchMessages() {
    fetch('/get_messages')
        .then(response => response.json())
        .then(data => updateChatArea(data))
        .catch(error => console.error('Error fetching messages:', error));
}
function clearMessages() {
    fetch('/clear_messages', {
        method: 'POST'
    }).then(() => {
        chatArea.innerHTML = '';  // Clear the chat area on the front end
    }).catch(error => console.error('Error clearing messages:', error));
}

function sendMessage(event) {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (!message) return;
    const sender = 'Therapist';  // Set as 'Therapist' for this page
    fetch('/send_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, message })
    }).then(() => {
        messageInput.value = '';
        fetchMessages();
    }).catch(error => console.error('Error sending message:', error));
}

// Initial fetch of messages and set interval to update chat
fetchMessages();
setInterval(fetchMessages, 2000);



/*
fetch('/clear_messages', {
    method: 'POST'
})
.then(() => console.log('Messages cleared'))
.catch(error => console.error('Error clearing messages:', error));
*/