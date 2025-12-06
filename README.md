# Hangman TOEIC 

Hangman TOEIC is an English vocabulary training Hangman game. This version uses an **SQLite database** to store all vocabulary words, allowing you to easily add and manage words through both the API and the frontend UI.

---

## 🚀 Features

✔ Fetch random words from SQLite database

✔ Full Hangman drawing system using Canvas

---

## 📂 Project Structure

```
📦 Hangman_Toeic
 ┣ 📂 public
 ┃ ┣ 📜 index.html
 ┃ ┣ 📜 script.js
 ┃ ┗ 📜 style.css
 ┣ 📜 get_random_word.js
 ┣ 📜 hangman.db
 ┣ 📜 import_words.js
 ┣ 📜 package-lock.json
 ┣ 📜 package.json
 ┣ 📜 README.md
 ┣ 📜 server.js
 ┗ 📜 wordList.js

```

---

## 🔧 Installation & Setup

### 1) Install dependencies

```bash
npm install express sqlite3 cors
```

### 2) Run the server

```bash
node server.js
```

The server will start at:

```
http://localhost:3000
```

Open the game at:

```
http://localhost:3000/index.html
```

---

## 🗄 SQLite Database Structure

The table is automatically created when `server.js` is started:

```
CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT UNIQUE
);
```

---

## 🔌 API Endpoints

### ▶ 1. Get a random word

```
GET /api/random
```

**Response:**

```json
{
  "word": "AGREEMENT"
}
```

### ▶ 2. Add a new word

```
POST /api/add
```

**Body JSON:**

```json
{
  "word": "BUDGET"
}
```

**Response:**

```json
{ "message": "Word added successfully" }
```

---

## 🎮 How To Play

1. The webpage loads a vocabulary word from the SQLite database.
2. The system masks the word and creates blank letter slots.
3. The player guesses alphabet letters A–Z.
4. A wrong guess draws another part of the Hangman.
5. 6 mistakes = Game Over.
6. Press **New Word** to start again.

You can also add new words directly through the input panel at the top of the page.

---

## 📦 Requirements

* Node.js 16+
* SQLite (built-in via `sqlite3` module)
* Modern browser with Canvas support

---

## ❤️ Credits

* UI/UX built with TailwindCSS
* Hangman drawing created using Canvas API
* Random word/data storage powered by SQLite + Express API

---

## 📜 License

MIT License – free to use and modify.

---

## ✨ Developer

**Punchaya Chancharoen**
