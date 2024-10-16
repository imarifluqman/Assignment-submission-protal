const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const authRoute = require('./routes/auth_routes');
const errorMiddleware = require('./middleware/error.middleware');
const courseRoute = require('./routes/courseRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(errorMiddleware);

// Routes
app.use('/api/auth', authRoute);  
app.use('/api', require('./routes/assignmentRoutes'));
app.use('/api', require('./routes/submissionRoutes'));
app.use('/api', courseRoute);

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
