// import_words.js
const Database = require('better-sqlite3');
const words = require('./wordList.js'); // ใช้ไฟล์ของคุณ

// create DB
const db = new Database('hangman.db');

// start transaction 
db.exec(`
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL UNIQUE,
    length INTEGER NOT NULL,
    difficulty TEXT DEFAULT 'medium', -- optional: easy/medium/hard
    used_count INTEGER DEFAULT 0,     -- เพิ่ม tracking ว่าเลือกมากี่ครั้ง
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_words_word ON words(word);
  CREATE INDEX IF NOT EXISTS idx_words_length ON words(length);
`);

// prepare insert statement
const insert = db.prepare('INSERT OR IGNORE INTO words (word, length) VALUES (?, ?)');

const insertMany = db.transaction((arr) => {
  for (const w of arr) {
    // clean: trim and uppercase
    const cleaned = String(w).trim().toUpperCase();
    if (!cleaned) continue;
    insert.run(cleaned, cleaned.length);
  }
});

insertMany(words);

console.log('Imported words into hangman.db — total rows:', db.prepare('SELECT COUNT(*) AS c FROM words').get().c);
db.close();