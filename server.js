// Referente as variaveis de ambiente que estão configuradas no código, coisas que são do desenvolvimento e por isso tem de ser seguras
require('dotenv').config();

//inicia o app do express
const express = require('express');
const app = express();

// conectando com a base de dados
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => console.log(e));

// Identifica o computador de um usuario, lógica dos cookies
const session = require('express-session');

// sessões serao salvas dentro da base de bados
const MongoStore = require('connect-mongo');

// mensagens autodestrutivas, bom para mandar feedback ao usuarios
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');

// funçoes que sao executadas nas rotas
const meuMiddleware = require ('./src/middlewares/middleware');

//é possivel postar formularios para dentro da aplicação
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Arqquivos estaticos que sao acessados diretamente 
app.use(express.static (path.resolve(__dirname, 'public')));

const mongooseConnetion = mongoose.connection;
const sessionOptions = session ({
    secret: 'qualquer coisa',
    store: new MongoStore({
        mongooseConnetion,
        mongoUrl: process.env.CONNECTIONSTRING
    }),
    resave: false,
    saveUnitialized: false,
    cookie: {
        maxAge:1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

// Arquivos que renderizam na tela
app.set('views', './src/views' );
app.set('view engine', 'ejs');

app.use(meuMiddleware);
app.use(routes);

// /mandando a aplicação escutar nas portas disponibilizadas 
app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000')
    });
});

