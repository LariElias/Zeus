import express, { json } from 'express';
const app = express(); 
import './Config/dbConfig.js';
import routes from './routes.js';
import cors from 'cors';

app.use(cors())
app.use(json());

app.get("/", (req, res) => {
    res.status(200).json({msg: 'bem vindo a minha api'})
})
app.use(routes); 
app.listen(3333);
