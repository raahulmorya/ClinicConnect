require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs'); // Add bcryptjs for password hashing
const jwt = require("jsonwebtoken");
const { verifyToken, isReceptionist } = require("./middleware/auth");


const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Model
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  role: String,
});
const User = mongoose.model("User", userSchema);


// Patient Model
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  address: String,
  symptoms: String,
  prescriptions: [{ type: String }], // Array of prescriptions
  patientId: { type: String, unique: true, default: () => `PAT-${Date.now()}` },
});

const Patient = mongoose.model('Patient', patientSchema);


// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Ensure user is set here
    next();
  });
};

// Seed dummy data (for testing)
const seedData = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    const salt = await bcrypt.genSalt(10);
    await User.create([
      { username: "doctor", password: await bcrypt.hash("doctor123", salt), role: "doctor" },
      { username: "receptionist", password: await bcrypt.hash("receptionist123", salt), role: "receptionist" },
    ]);
    console.log("Dummy users added");
  }
};

// Endpoint to authenticate user
app.post("/auth/login", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.findOne({ username, role });
    console.log(`${user}`);
    console.log("dddd");
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (isMatch) {
        console.log("i run to ffenearate token");
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
          expiresIn: 86400, // 24 hours
        });
         res.status(200).json({ message: "Login successful", token, user });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      } else {
        res.status(401).json({ doctormessage: "Invalid credentials" });
      }
    } catch (error) {
    console.log("i failed to ffenearate token");
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
});


// Endpoint to register a new user
app.post("/auth/register", async (req, res) => {
  const { username, password, role } = req.body;
  try {
        const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error registering user", error: error.message });
  }
});

// Protected endpoint to get user details
app.get("/auth/user/:username", authenticateToken, async (req, res) => {
  const { username } = req.params;
  const { user } = req; // The user object from the token

  if (user.username !== username) {
    return res
      .status(403)
      .json({ message: "Forbidden: You cannot access this user" });
  }
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user details server",
      error: error.message,
    });
  }
});


// Endpoint to add a patient
app.post('/api/patients', async (req, res) => {
  const { name, age, gender, address, symptoms } = req.body;

  try {
    const newPatient = new Patient({ name, age, gender, address, symptoms });
    await newPatient.save();
    res.status(201).json({ 
      message: 'Patient added successfully',
      patient: newPatient
    });
  } catch (error) {
    res.status(400).json({ message: 'Error adding patient', error: error.message });
  }
});

// Endpoint to fetch patient details by ID
app.get('/api/patients/:patientId', async (req, res) => {
  const { patientId } = req.params;
    console.log(patientId);

  try {
    const patient = await Patient.findOne({patientId});
    console.log(`${patient}`);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    console.log("found");

    res.status(200).json({ patient });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient details', error: error.message });
  }
});

// Endpoint to add a prescription for a patient
app.post('/api/patients/:patientId/prescription', authenticateToken, async (req, res) => {
  const { patientId } = req.params;
  const { prescription } = req.body;
  const { user } = req; // The user object from the token

  try {
    // Check if the user making the request is authenticated and has a doctor role
    if (user.username !== "doctor") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update the patient record with the new prescription
    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Add the prescription to the patient's prescriptions array
    patient.prescriptions.push(prescription);
    await patient.save();

    res
      .status(200)
      .json({ message: "Prescription added successfully", patient });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding prescription", error: error.message });
  }
});

// Endpoint to get all patients
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  seedData(); // Seed the database with dummy data
});
