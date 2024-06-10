const bcrypt = require('bcrypt');
const db = require('../config/db');

const authController = {
    loginPage: (req, res) => {
        res.render('login');
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
                    // Autenticação bem-sucedida
                    res.redirect('/orders');
                } else {
                    res.status(400).send('Senha incorreta.');
                }
            });
        });
    }
};

module.exports = authController;
