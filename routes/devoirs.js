const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../models');
const { Op } = require('sequelize');

// GET all devoirs
router.get('/', async (req, res) => {
  try {
    const devoirs = await db.Devoir.findAll({
      include: [
        { model: db.Classe, as: 'classe' },
        { model: db.Enseignant, as: 'enseignant' },
      ],
    });
    res.json(devoirs);
  } catch (error) {
    console.error("Error fetching devoirs:", error);
    res.status(500).json({ error: 'Failed to fetch devoirs', details: error.message });
  }
});

// GET a specific devoir by ID
router.get('/:id', async (req, res) => {
  try {
    const devoir = await db.Devoir.findByPk(req.params.id, {
      include: [
        { model: db.Classe, as: 'classe' },
        { model: db.Enseignant, as: 'enseignant' },
      ],
    });
    if (!devoir) {
      return res.status(404).json({ message: 'Devoir not found' });
    }
    res.json(devoir);
  } catch (error) {
    console.error("Error fetching devoir:", error);
    res.status(500).json({ error: 'Failed to fetch devoir', details: error.message });
  }
});

// POST a new devoir
router.post('/', [
  body('description').notEmpty().withMessage('Description is required'),
  body('matiere').notEmpty().withMessage('Matiere is required'),
  body('dateLimite').isISO8601().withMessage('Invalid date format (YYYY-MM-DD)'),
  body('classeId').isInt().withMessage('Classe ID must be an integer'),
  body('enseignantId').isInt().withMessage('Enseignant ID must be an integer'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { description, dateLimite, classeId, matiere, enseignantId } = req.body;
    const classe = await db.Classe.findByPk(classeId);
    if (!classe) {
      return res.status(400).json({ error: 'Class not found' });
    }
    const enseignant = await db.Enseignant.findByPk(enseignantId);
    if (!enseignant) {
      return res.status(400).json({ error: 'Teacher not found' });
    }

    const nouveauDevoir = await db.Devoir.create({ description, dateLimite, classeId, matiere, enseignantId });
    res.status(201).json(nouveauDevoir);
  } catch (error) {
    console.error("Error creating devoir:", error);
    res.status(500).json({ error: 'Failed to create devoir', details: error.message });
  }
});

// GET devoirs by class (auto-creating "Non rendu" soumissions for late ones)
router.get('/classe/:classeId', async (req, res) => {
    try {
        const classe = await db.Classe.findByPk(req.params.classeId);
        if (!classe) {
            return res.status(404).json({ error: 'Class not found' });
        }

        const devoirs = await db.Devoir.findAll({
            where: { classeId: req.params.classeId },
            order: [['dateLimite', 'ASC']],
            include: [{ model: db.Enseignant, as: 'enseignant' }]
        });

        const now = new Date();
        for (const devoir of devoirs) {
            if (devoir.dateLimite < now) {
                // => If the due date is in the past, create a "Non rendu" soumission for every élève lacking a submission
                const eleves = await db.Eleve.findAll({ where: { classeId: req.params.classeId } });

                for (const eleve of eleves) {
                    const [submission, created] = await db.Soumission.findOrCreate({
                        where: { devoirId: devoir.id, eleveId: eleve.id },
                        defaults: {
                            dateSoumission: devoir.dateLimite,
                            note: 0,
                            reponse: 'Non rendu'
                        }
                    });
                    if (created) {
                        console.log(
                          `Auto-submission created for devoir=${devoir.id}, eleve=${eleve.id}`
                        );
                    }
                }
            }
        }
        res.json(devoirs);
    } catch (error) {
        console.error("Error fetching devoirs by classe:", error);
        res.status(500).json({
            error: 'Failed to fetch devoirs by classe',
            details: error.message
        });
    }
});
// PUT update a devoir, DELETE a devoir, etc. can go here.

module.exports = router;
