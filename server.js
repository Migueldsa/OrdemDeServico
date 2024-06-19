const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Importar rotas
const indexRoutes = require('./routes/index');
const ordersRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/auth');

// Usar rotas
app.use('/', indexRoutes);
app.use('/', ordersRoutes);
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});