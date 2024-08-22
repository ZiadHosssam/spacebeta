const chatArea = document.getElementById('chat-area');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

function formatMessage(msg) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `sender-${msg.sender.toLowerCase()}`);
    
    const timestampElement = document.createElement('div');
    timestampElement.classList.add('timestamp');
    timestampElement.textContent = msg.timestamp;
    
    const contentElement = document.createElement('div');
    contentElement.textContent = msg.message;
    
    messageElement.appendChild(timestampElement);
    messageElement.appendChild(contentElement);
    
    return messageElement;
}

function updateChatArea(messages) {
    chatArea.innerHTML = '';
    messages.forEach(msg => {
        chatArea.appendChild(formatMessage(msg));
    });
    chatArea.scrollTop = chatArea.scrollHeight;
}

function fetchMessages() {
    fetch('/get_messages')
        .then(response => response.json())
        .then(data => updateChatArea(data))
        .catch(error => console.error('Error fetching messages:', error));
}

function sendMessage(event) {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (!message) return;
    
    const sender = 'Patient';  // Set as 'Patient' for this page
    fetch('/send_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, message })
    }).then(() => {
        messageInput.value = '';
        fetchMessages();
    }).catch(error => console.error('Error sending message:', error));
}

messageForm.addEventListener('submit', sendMessage);

// Initial fetch of messages and set interval to update chat
fetchMessages();
setInterval(fetchMessages, 2000);