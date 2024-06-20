const bcrypt = require('bcrypt');
const db = require('../config/db');

const authController = {
    loginPage: (req, res) => {
        res.render('login');
    },
    registerPage: (req, res) => {
        res.render('register');
    },
    login: (req, res) => {
        const { username, password } = req.body;
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
            if (err) {
                return res.status(500).send('Erro no servidor.');
            }
            if (!user) {
                return res.status(400).send('Usuário não encontrado.');
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.redirect('/orders');
                } else {
                    res.status(400).send('Senha incorreta.');
                }
            });
        });
    },
    register: (req, res) => {
        const { username, password } = req.body;
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).send('Erro ao registrar.');
            }
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
                if (err) {
                    return res.status(500).send('Erro ao registrar.');
                }
                res.redirect('/login');
            });
        });
    }
};

module.exports = authController;
