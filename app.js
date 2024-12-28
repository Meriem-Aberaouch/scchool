const express = require('express');
const path = require('path');
require('dotenv').config(); // Load environment variables
const db = require('./models'); // Import your Sequelize models

// Routes
const devoirsRoutes = require('./routes/devoirs');
const elevesRoutes = require('./routes/eleves');
const enseignantsRoutes = require('./routes/enseignants');
const classesRoutes = require('./routes/classes');
const soumissionsRoutes = require('./routes/soumissions');

const app = express();
const port = process.env.PORT || 1001;

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the School Assignments API' });
});

// Attach our routes
app.use('/api/devoirs', devoirsRoutes);
app.use('/api/eleves', elevesRoutes);
app.use('/api/enseignants', enseignantsRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/soumissions', soumissionsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ errors: err.errors.map(e => e.message) });
  }
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();

module.exports = app;
