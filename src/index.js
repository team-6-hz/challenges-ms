import cors from 'cors';
import express from 'express';
import indexRouter from './routes/challengeRoutes.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const app = express();
app.use(cors());

app.use('/', indexRouter);

app.use((req, res,) => {
    try {
        res.status(404).send("Sorry can't find that!");
    } catch (err) {
        throw new Error('Error occurred during 404');
    }
});

app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), () => {
    console.log(`service is running on port ${server.address().port}`);
});
