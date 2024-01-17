import cors from 'cors';
import express from 'express';
import indexRouter from './routes/challengeRoutes.js';
import { supabase } from './supabaseClient.js';
import port from './port.js';

const app = express();
const currentPort = port()
app.use(cors());

app.use('/', indexRouter);

const server = app.listen(currentPort, () => {
    console.log(`Example app listening at http://localhost:${currentPort}`)
}); 

app.use((req, res,) => {
    try {
        res.status(404).send("Sorry can't find that!");
    } catch (err) {
        throw new Error('Error occurred during 404');
    }
});
