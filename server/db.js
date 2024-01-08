// db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/MugBitDB';
const dbName = 'MugBitDB'; 

let client;
let db;

async function connectToDatabase() {
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function getDatabase() {
  return db;
}

function closeConnection() {
  if (client) {
    client.close();
    console.log('MongoDB connection closed');
  }
}

module.exports = { connectToDatabase, getDatabase, closeConnection };
