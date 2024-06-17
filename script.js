document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Fungsi untuk memuat percakapan sebelumnya
function loadPreviousConversation() {
    fetch('/api/conversation', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        data.messages.forEach(message => {
            appendMessage(message.role, message.content);
        });
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    appendMessage('user', userInput);

    fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        const responseText = data.response;
        const translatedResponse = translateToIndonesian(responseText);
        appendMessage('raphael', translatedResponse);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    document.getElementById('user-input').value = '';
}

function appendMessage(role, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${role}`;
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function translateToIndonesian(text) {
    // Simple translation function for demonstration purposes.
    // You may want to use a translation API or library for real translation.
    return text.replace(/hello/gi, 'halo')
               .replace(/world/gi, 'dunia')
               .replace(/how are you/gi, 'apa kabar')
               .replace(/i am fine/gi, 'saya baik-baik saja');
}

// Memuat percakapan sebelumnya saat halaman pertama kali dibuka
loadPreviousConversation();
