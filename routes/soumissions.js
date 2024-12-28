const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../models');

// GET all soumissions (useful for an enseignant to see all)
router.get('/', async (req, res) => {
  try {
    const allSoumissions = await db.Soumission.findAll({
      include: [
        { model: db.Eleve, as: 'eleve' },
        { model: db.Devoir, as: 'devoir' }
      ]
    });
    res.json(allSoumissions);
  } catch (error) {
    console.error("Error fetching all soumissions:", error);
    res.status(500).json({ error: 'Failed to fetch all soumissions', details: error.message });
  }
});

// POST a new submission (Jean turning it in before dateLimite, etc.)
router.post('/', [
  body('devoirId').isInt().withMessage('Devoir ID must be an integer'),
  body('eleveId').isInt().withMessage('Eleve ID must be an integer'),
  body('reponse').optional(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { devoirId, eleveId, reponse } = req.body;

    const devoir = await db.Devoir.findByPk(devoirId);
    if (!devoir) return res.status(400).json({ error: 'Devoir not found' });

    const eleve = await db.Eleve.findByPk(eleveId);
    if (!eleve) return res.status(400).json({ error: 'Eleve not found' });

    const existingSubmission = await db.Soumission.findOne({ where: { devoirId, eleveId } });
    if (existingSubmission) {
      return res.status(400).json({ error: 'Submission already exists for this student and assignment' });
    }

    // Check if past dateLimite
    const now = new Date();
    if (devoir.dateLimite < now) {
      return res.status(400).json({ error: 'Deadline has passed' });
    }

    // Create submission
    const submission = await db.Soumission.create({
      devoirId,
      eleveId,
      reponse,
      dateSoumission: now
    });
    res.status(201).json(submission);
  } catch (error) {
    console.error("Error creating submission:", error);
    res.status(500).json({ error: 'Failed to create submission', details: error.message });
  }
});

// GET soumissions for a specific devoir
router.get('/devoir/:devoirId', async (req, res) => {
  try {
    const submissions = await db.Soumission.findAll({
      where: { devoirId: req.params.devoirId },
      include: [
        { model: db.Eleve, as: 'eleve' }
      ]
    });
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions by devoir:", error);
    res.status(500).json({ error: 'Failed to fetch submissions', details: error.message });
  }
});

module.exports = router;
