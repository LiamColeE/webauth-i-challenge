const knex = require("knex");
const config = require("./knexfile");
const db = knex(config.development);

module.exports = {
    register,
    getUserById
}

function register(user){
    return db("users").insert(user)
}

function getUserById(userId){
    return db("users").where({id: userId})
}
