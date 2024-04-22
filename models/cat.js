const {client} = require("../dbconnection.js")

let collection;

async function runDBConnection() {
    try {
        console.log("Connecting to the database...");
        await client.connect();
        collection = client.db("kitten").collection('kitten');
        console.log("Database connection successful!");
    } catch (ex) {
        console.error("Error connecting to the database:", ex);
    }
}

runDBConnection();

module.exports = collection;
