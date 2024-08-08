const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB and get the collection
let db, collection;
client
  .connect()
  .then((connection) => {
    db = connection.db("clinic");
    collection = db.collection("patients");
    console.log("Connected to MongoDB and collection selected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Get all patients
router.get("/patients", async (req, res) => {
  try {
    const patients = await collection.find().toArray();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new patient
router.post("/patients", async (req, res) => {
  const patient = req.body;
  try {
    const result = await collection.insertOne(patient);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
