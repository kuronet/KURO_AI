const fs = require('fs');
const path = require('path');
const { Groq } = require('groq'); // Menggunakan require untuk modul CommonJS

const conversationFilePath = path.resolve(__dirname, '../conversation.json');

// Fungsi untuk membaca percakapan dari file JSON
const loadConversation = () => {
    try {
        const data = fs.readFileSync(conversationFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing conversation file:', error);
        return { messages: [] };
    }
};

module.exports = (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const conversation = loadConversation();
    res.status(200).json(conversation);
};
