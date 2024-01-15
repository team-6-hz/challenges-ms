import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import cors from 'cors';
import express from 'express';
import indexRouter from './routes/challengeRoutes.js';


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    ` console.log(Express running → PORT ${server.address().port}); `
}); 

