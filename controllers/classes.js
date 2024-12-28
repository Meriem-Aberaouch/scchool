const db = require('../models');

const ClassesController = {
    getAllClasses: async (req, res) => {
        try {
            const classes = await db.Classe.findAll();
            res.json(classes);
        } catch (error) {
            console.error("Error fetching classes:", error);
            res.status(500).json({ error: 'Failed to fetch classes', details: error.message });
        }
    },

    getClassById: async (req, res) => {
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
    },

    createClasse: async (req, res) => {
        try {
            const newClasse = await db.Classe.create(req.body);
            res.status(201).json(newClasse);
        } catch (error) {
            console.error("Error creating classe:", error);
            res.status(500).json({ error: 'Failed to create classe', details: error.message });
        }
    },
    updateClasse: async (req, res) => {
        try {
            const classe = await db.Classe.findByPk(req.params.id);
            if (!classe) {
                return res.status(404).json({ message: 'Classe not found' });
            }
            await classe.update(req.body);
            res.json(classe);
        } catch (error) {
            console.error("Error updating classe:", error);
            res.status(500).json({ error: 'Failed to update classe', details: error.message });
        }
    },

    deleteClasse: async (req, res) => {
        try {
            const classe = await db.Classe.findByPk(req.params.id);
            if (!classe) {
                return res.status(404).json({ message: 'Classe not found' });
            }
            await classe.destroy();
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting classe:", error);
            res.status(500).json({ error: 'Failed to delete classe', details: error.message });
        }
    }
};

module.exports = ClassesController;