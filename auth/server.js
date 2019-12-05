const express = require("express");
const bcrypt = require("bcryptjs");
var bodyParser = require("body-parser");

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

})

module.exports = server;