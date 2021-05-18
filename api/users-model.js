const db = require("../data/dbConfig.js");

function find() {
    return db("users")
}

function findByUserName(username) {
    return db("users as u")
        .where("username", username)
        .select("*")

}

function findById(id) {
    return db("users as u")
        .where("id", id)
        .select("*").first()
}

async function add(newUser) {
    const [id] = await db("users as u").insert(newUser)
    return findById(id)

}

module.exports = {
    find,
    findByUserName,
    add,
}