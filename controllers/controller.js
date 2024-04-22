const path = require('path');
const client = require("../dbconnection");
const { ObjectId } = require('mongodb');

const dbname = "test";
const collectionName = "cat";

exports.getAllKittens = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname);
        const cats = await db.collection(collectionName).find().toArray();
        res.json({ statusCode: 200, data: cats, message: 'Retrieved all cards successfully', success: true });
    } catch (err) {
        console.error("Error fetching cards here:", err);
        res.status(500).json({ message: 'Internal server error', success: false });
    } finally {
        await client.close();
    }
};

exports.createKitten = async (req, res) => {
    const newKitten = req.body;
    try {
        await client.connect();
        const db = client.db(dbname);
        const result = await db.collection(collectionName).insertOne(newKitten);
        res.json({ statusCode: 200, data: result.ops, message: 'New kitten created successfully', success: true });
    } catch (err) {
        console.error("Error creating kitten:", err);
        res.status(500).json({ message: 'Internal server error', success: false });
    } finally {
        await client.close();
    }
};

exports.getIndex = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    } catch (err) {
        console.error("Error getting index:", err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

exports.deleteKitten = async (req, res) => {
    const id = req.params.id;
    try {
        await client.connect();
        const db = client.db("test");
        const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
        res.json({ statusCode: 200, data: result, message: 'Kitten deleted successfully', success: true });
    } catch (err) {
        console.error("Error deleting kitten:", err);
        res.status(500).json({ message: 'Internal server error', success: false });
    } finally {
        await client.close();
    }
};