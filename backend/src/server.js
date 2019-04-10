const express = require('express'); //importa a biblioteca express dentro da node_modules
const mongoose = require('mongoose'); //importa a biblioteca express dentro da node_modules
const path = require('path');
const cors = require('cors');


const app = express(); // a const app vai guardar todas as informações da aplicação
app.use(cors());

const server = require('http').server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-vfvgm.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;

    return next();
})


app.use(express.json());//.use serve para cadastrar um modulo dentro do express| ajuda o servidor a endender as requisições em formato json
app.use(express.urlencoded({ extended: true })); //permite envio de arquivos
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(3333);

