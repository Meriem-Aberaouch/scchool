const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../models');

// GET all eleves
router.get('/', async (req, res) => {
  try {
    const eleves = await db.Eleve.findAll({
      include: [{ model: db.Classe, as: 'classe' }],
    });
    res.json(eleves);
  } catch (error) {
    console.error("Error fetching eleves:", error);
    res.status(500).json({ error: 'Failed to fetch eleves', details: error.message });
  }
});

// GET a specific eleve by ID
router.get('/:id', async (req, res) => {
  try {
    const eleve = await db.Eleve.findByPk(req.params.id, {
      include: [{ model: db.Classe, as: 'classe' }],
    });
    if (!eleve) {
      return res.status(404).json({ message: 'Eleve not found' });
    }
    res.json(eleve);
  } catch (error) {
    console.error("Error fetching eleve:", error);
    res.status(500).json({ error: 'Failed to fetch eleve', details: error.message });
  }
});

// POST a new eleve
router.post('/', [
  body('nom').notEmpty().withMessage('Nom is required'),
  body('prenom').notEmpty().withMessage('Prenom is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('classeId').isInt().withMessage('Classe ID must be an integer'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newEleve = await db.Eleve.create(req.body);
    res.status(201).json(newEleve);
  } catch (error) {
    console.error("Error creating eleve:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create eleve', details: error.message });
  }
});

// PUT / DELETE can follow the same pattern

module.exports = router;
