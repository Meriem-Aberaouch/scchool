const db = require('../models');

const ElevesController = {
    getAllEleves: async (req, res) => {
        try {
            const eleves = await db.Eleve.findAll({ include: [{ model: db.Classe, as: 'classe' }] });
            res.json(eleves);
        } catch (error) {
            console.error("Error fetching eleves:", error);
            res.status(500).json({ error: 'Failed to fetch eleves', details: error.message });
        }
    },

    getEleveById: async (req, res) => {
        try {
            const eleve = await db.Eleve.findByPk(req.params.id, { include: [{ model: db.Classe, as: 'classe' }] });
            if (!eleve) {
                return res.status(404).json({ message: 'Eleve not found' });
            }
            res.json(eleve);
        } catch (error) {
            console.error("Error fetching eleve:", error);
            res.status(500).json({ error: 'Failed to fetch eleve', details: error.message });
        }
    },

    createEleve: async (req, res) => {
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
    }
};

module.exports = ElevesController;