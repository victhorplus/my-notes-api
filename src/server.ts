import 'dotenv/config';
const express = require('express')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

const userRouter = require('./use-cases/user/user.controller');
const notesRouter = require('./use-cases/notes/notes.controller');
const refreshTokenRouter = require('./use-cases/refresh-token/refresh-token.controller');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Hello World. Welcome to My Notes API!")
});

app.use('/user', userRouter);
app.use('/notes', notesRouter);
app.use('/refresh-token', refreshTokenRouter);

export function initServer(): void {
    app.listen(port, '0.0.0.0', () => {
        console.log("Servidor rodando na porta: ", port)
    });
}