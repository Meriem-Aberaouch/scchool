const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../models');

// GET all enseignants
router.get('/', async (req, res) => {
  try {
    const enseignants = await db.Enseignant.findAll();
    res.json(enseignants);
  } catch (error) {
    console.error("Error fetching enseignants:", error);
    res.status(500).json({ error: 'Failed to fetch enseignants', details: error.message });
  }
});

// GET enseignant by ID
router.get('/:id', async (req, res) => {
  try {
    const enseignant = await db.Enseignant.findByPk(req.params.id);
    if (!enseignant) {
      return res.status(404).json({ message: 'Enseignant not found' });
    }
    res.json(enseignant);
  } catch (error) {
    console.error("Error fetching enseignant:", error);
    res.status(500).json({ error: 'Failed to fetch enseignant', details: error.message });
  }
});

// POST new enseignant
router.post('/', [
  body('nom').notEmpty().withMessage('Nom is required'),
  body('prenom').notEmpty().withMessage('Prenom is required'),
  body('email').isEmail().withMessage('Invalid email format'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newEnseignant = await db.Enseignant.create(req.body);
    res.status(201).json(newEnseignant);
  } catch (error) {
    console.error("Error creating enseignant:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create enseignant', details: error.message });
  }
});

// PUT / DELETE as needed

module.exports = router;
