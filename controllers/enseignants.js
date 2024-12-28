const db = require('../models');

const EnseignantsController = {
    getAllEnseignants: async (req, res) => {
        try {
            const enseignants = await db.Enseignant.findAll();
            res.json(enseignants);
        } catch (error) {
            console.error("Error fetching enseignants:", error);
            res.status(500).json({ error: 'Failed to fetch enseignants', details: error.message });
        }
    },

    getEnseignantById: async (req, res) => {
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
    },

    createEnseignant: async (req, res) => {
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
    },
    updateEnseignant: async (req, res) => {
        try {
            const enseignant = await db.Enseignant.findByPk(req.params.id);
            if (!enseignant) {
                return res.status(404).json({ message: 'Enseignant not found' });
            }
            await enseignant.update(req.body);
            res.json(enseignant);
        } catch (error) {
            console.error("Error updating enseignant:", error);
            res.status(500).json({ error: 'Failed to update enseignant', details: error.message });
        }
    },

    deleteEnseignant: async (req, res) => {
        try {
            const enseignant = await db.Enseignant.findByPk(req.params.id);
            if (!enseignant) {
                return res.status(404).json({ message: 'Enseignant not found' });
            }
            await enseignant.destroy();
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting enseignant:", error);
            res.status(500).json({ error: 'Failed to delete enseignant', details: error.message });
        }
    }
};

module.exports = EnseignantsController;