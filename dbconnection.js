const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Raj:root@cluster0.aj2mz9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectToDb = async () => {
  try {
    await client.connect();
    console.log('DB Connected');
  } catch (err) {
    console.error("Error connecting to db", err);
  }
};

connectToDb();

module.exports = client;
