// Mock session state
const sessions = {
    'unbooked-session-1': false,
    'unbooked-session-2': false,
    'unbooked-session-3': false
};

function bookSession(id) {
    if (sessions[id]) {
        alert('This session is already booked.');
    } else {
        sessions[id] = true;
        const sessionCard = document.getElementById(id);
        sessionCard.classList.add('booked');
        const button = sessionCard.querySelector('button');
        button.textContent = 'Cancel Session';
        button.onclick = () => unbookSession(id);
    }
}

function unbookSession(id) {
    if (!sessions[id]) {
        alert('This session is not booked.');
    } else {
        sessions[id] = false;
        const sessionCard = document.getElementById(id);
        sessionCard.classList.remove('booked');
        const button = sessionCard.querySelector('button');
        button.textContent = 'Book Session';
        button.onclick = () => bookSession(id);
    }
}