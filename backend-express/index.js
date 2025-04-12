const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(express.json());  // Parse incoming JSON requests

app.use('/auth', authRoutes);  // Handle authentication routes

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  })

