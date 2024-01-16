import cors from 'cors';
import express from 'express';
//import indexRouter from './routes/challengeRoutes.js';
import { supabase } from './supabaseClient.js';

const app = express();
const port = 3020;
app.use(cors());

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//app.use('/', indexRouter);



async function getData() {
    const { data, error } = await supabase.from('challenges').select('*');
    if (error) console.log('query error', error);
    else{
        console.log(data);
        return data;
    } 
}
async function getChallengeData(req, res, next) {
  try {
    res.json(await getData());
  } catch (error) {
    next(err);
  }
}
app.get('/getChallenges', cors(), getChallengeData);


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
