const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'serioga',
        database: 'lafinale'
    }
});
// postgres.select('*').from('users').then(data => {
//     console.log(data);
// });




const app = express();

app.use(cors());
app.use(bodyParser.json());



app.post('/signin', (res,req) => {signin.handleSignIn(res,req,db,bcrypt)});

app.post('/register', (res, req) => {register.handleRegister(res,req,db,bcrypt)});

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        if (user.length) {
            res.json(user[0]);
        }else {
            res.status(400).json('Not Found')
        }
        
    }).catch(err => res.status(400).json('Error getting User'))
});
app.put('/image', (req, res) => {image.handleImage(req,res,db)});
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res, db)});


app.listen(3000, () => {
    console.log('App is running on port 3000')
});