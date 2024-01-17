import cors from 'cors';
import express from 'express';
import indexRouter from './routes/challengeRoutes.js';
import { supabase } from './supabaseClient.js';

const app = express();
const port = 3020;
app.use(cors());

app.use('/', indexRouter);

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}); 

app.use((req, res,) => {
    try {
        res.status(404).send("Sorry can't find that!");
    } catch (err) {
        throw new Error('Error occurred during 404');
    }
});
