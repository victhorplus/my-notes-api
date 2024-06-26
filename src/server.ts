import 'dotenv/config';
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

const userRouter = require('./modules/user/use-cases/user.controller');
const notesRouter = require('./modules/notes/use-cases/notes.controller');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World. Welcome to My Notes API!")
});

app.use('/user', userRouter);
app.use('/notes', notesRouter);

export function initServer(): void {
    app.listen(port, '0.0.0.0', () => {
        console.log("Servidor rodando na porta: ", port)
    });
}