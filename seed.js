const mongoose = require("mongoose");
require("dotenv").config();

// Define a schema and model for your data
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  condition: String,
});

const Patient = mongoose.model("Patient", patientSchema);

// Connect to MongoDB
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    // Add some dummy data
    return Patient.insertMany([
      { name: "John Doe", age: 30, condition: "Flu" },
      { name: "Jane Smith", age: 25, condition: "Cold" },
      { name: "Michael Johnson", age: 35, condition: "Allergy" },
    ]);
  })
  .then(() => {
    console.log("Dummy data inserted");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB or inserting data:", err);
  });
