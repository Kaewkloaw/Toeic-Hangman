<div align="center">
  <h1> Toeic Hangman </h1>
  <img src="https://readme-typing-svg.herokuapp.com/?lines=Welcome+to+Hangman+TOEIC!;🌷+Master+English+Vocabulary;✨+Learn+with+Fun+and+Hard&center=true&width=500&height=45&color=F48FB1">
  <p align="center">🌼 An interactive English vocabulary training game powered by SQLite and Node.js. 💐</p>
 
  ![Node.js](https://img.shields.io/badge/Node.js-EC407A?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![Express](https://img.shields.io/badge/Express-F06292?style=for-the-badge&logo=express&logoColor=white)
  ![SQLite](https://img.shields.io/badge/SQLite-F48FB1?style=for-the-badge&logo=sqlite&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F8BBD0?style=for-the-badge&logo=javascript&logoColor=white)
  ![HTML5](https://img.shields.io/badge/HTML5-F6BDC0?style=for-the-badge&logo=html5&logoColor=white)
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/a32fa128-3a2b-4317-9ecf-b31d99d135be" width="80%" alt="Hangman Game Preview">
</div>

## 📄 Project Description
<p style="text-align: justify; line-height: 1.6;">
  <strong>Hangman TOEIC</strong> is an engaging educational web application designed to help users practice English vocabulary for the TOEIC exam. Unlike static games, this project features a dynamic <strong>SQLite database</strong> backend that stores an expanding library of words. Users can play the classic Hangman game with a smooth <strong>Canvas-based drawing system</strong> and even contribute new vocabulary words directly through the UI or API. It's the perfect blend of fun, learning, and backend technology! 🌸
</p>

## ✨ Key Features
* 🌸 **Dynamic Word Fetching:** Retrieves random vocabulary words instantly from the local SQLite database.
* 🌷 **Interactive Gameplay:** Full Hangman drawing system rendered in real-time using the HTML5 Canvas API.
* 🌺 **Word Management:** Easy-to-use interface and API for adding new words to the database.
* 💐 **Simple API Architecture:** Built with Express.js to handle word retrieval and database updates efficiently.

## 📡 API Reference

| Endpoint | Method | Description | Example Body |
| :--- | :---: | :--- | :--- |
| `/api/random` | **GET** | Fetch a random word | N/A |
| `/api/add` | **POST** | Add a new word | `{ "word": "BUDGET" }` |

## 🚀 Getting Started

### 🍃 Prerequisites
* **Node.js** (Version 16 or higher)
* **Web Browser** (Modern browser with Canvas support)

### 🌱 Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Kaewkloaw/Toeic-Hangman.git
    ```
2.  **Navigate to the project:**
    ```bash
    cd Toeic-Hangman
    ```
3.  **Install dependencies:**
    ```bash
    npm install express sqlite3 cors
    ```
4.  **Run the server:**
    ```bash
    node server.js
    ```
5.  **Start playing:**
    Open your browser and visit: `http://localhost:3000/index.html`

### 🌺 Database Structure
The system automatically creates a `hangman.db` file with the following schema:
```sql
CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT UNIQUE
);
