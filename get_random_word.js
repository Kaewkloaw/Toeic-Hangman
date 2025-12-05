const Database = require("better-sqlite3");
const db = new Database("hangman.db");

function getRandomWord() {
    const row = db.prepare("SELECT word FROM words ORDER BY RANDOM() LIMIT 1").get();
    return row.word;
}

console.log(getRandomWord());
