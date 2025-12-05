const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const app = express();
// Prefer `hangman.db` if present, fall back to `words.db`
const DB_FILE = fsExistsSync = require('fs').existsSync('hangman.db') ? 'hangman.db' : 'words.db';
const db = new Database(DB_FILE);

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// random word API
app.get('/api/random-word', (req, res) => {
    try {
        const row = db.prepare("SELECT word FROM words ORDER BY RANDOM() LIMIT 1").get();
        res.json({ word: row.word });
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

// all words API
app.get('/api/words', (req, res) => {
    try {
        const rows = db.prepare('SELECT word FROM words').all();
        const words = rows.map(r => r.word);
        res.json(words);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(3000, () => {
    console.log("API Server running at http://localhost:3000");
});
