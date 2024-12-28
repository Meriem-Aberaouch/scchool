const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../models');

// GET all classes
router.get('/', async (req, res) => {
  try {
    const classes = await db.Classe.findAll();
    res.json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: 'Failed to fetch classes', details: error.message });
  }
});

// GET a specific class by ID
router.get('/:id', async (req, res) => {
  try {
    const classe = await db.Classe.findByPk(req.params.id);
    if (!classe) {
      return res.status(404).json({ message: 'Classe not found' });
    }
    res.json(classe);
  } catch (error) {
    console.error("Error fetching classe:", error);
    res.status(500).json({ error: 'Failed to fetch classe', details: error.message });
  }
});

// POST a new class
router.post('/', [
  body('nom').notEmpty().withMessage('Classe name is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newClass = await db.Classe.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    console.error("Error creating classe:", error);
    res.status(500).json({ error: 'Failed to create classe', details: error.message });
  }
});

// PUT (update) or DELETE can be added similarly

module.exports = router;
