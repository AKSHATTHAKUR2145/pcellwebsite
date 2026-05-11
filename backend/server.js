require('dotenv').config(); // <-- Bas yahi ek line kaafi hai sabse upar!
const express = require('express');
const cors = require('cors');
const atsRoutes = require('./routes/atsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ats', atsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});