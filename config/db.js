const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ordem_servico.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        orderNumber TEXT,
        customerName TEXT,
        date TEXT,
        product TEXT,
        repairCost TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS productDescriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productId INTEGER,
        description TEXT,
        FOREIGN KEY(productId) REFERENCES orders(id)
    )`);

    // Adicione a tabela de usuários
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);
});

module.exports = db;
