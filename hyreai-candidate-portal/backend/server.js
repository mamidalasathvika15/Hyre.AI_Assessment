const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const candidateRoutes = require("./routes/candidateRoutes");

dotenv.config();

const app = express();

// Connect database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/candidates", candidateRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("HyreAI Candidate Portal Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});