const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const restricted = require('./middleware/restricted')

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())

const db = require('./db/users-access');


server.get('/', (req,res) => {
    res.send("server available");
    res.status(200);
})

server.post('/api/register',  (req,res) => {
    let user = req.body;

    user.password = bcrypt.hashSync(user.password, 12)
    
    db.register(user)
    .then((result) => {
        res.status(200)
        db.getUserById(result[0])
        .then((user) => {
            res.send(user)
        })       
    })
    .catch((err) =>{
        console.log(err)
        res.status(500)
        res.send({error: "internal server error"})
    })
})

server.post('/api/login', (req,res) => {
    let loginCredentials = req.body;
    console.log(loginCredentials)

    db.getUserByUsername(loginCredentials.username)
    .then(user => {
        console.log(user)
        if(user[0] && bcrypt.compareSync(loginCredentials.password, user[0].password)) {
            res.status(200)
            res.send({message:`Welcome ${user[0].username}`})
        }
        else {
            res.status(401)
            res.send({message: 'invalid credentials'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500)
        res.send({error: 'internal server error'})
    })
})

server.get('/api/users', restricted, (req,res) => {
    
})

module.exports = server;