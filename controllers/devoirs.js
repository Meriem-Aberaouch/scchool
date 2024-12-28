const db = require('../models');
const { Op } = require('sequelize');

const DevoirsController = {
    getAllDevoirs: async (req, res) => {
        try {
            const devoirs = await db.Devoir.findAll({
                include: [
                    { model: db.Classe, as: 'classe' },
                    { model: db.Enseignant, as: 'enseignant' }
                ]
            });
            res.json(devoirs);
        } catch (error) {
            console.error("Error fetching devoirs:", error);
            res.status(500).json({ error: 'Failed to fetch devoirs', details: error.message });
        }
    },

    getDevoirById: async (req, res) => {
        try {
            const devoir = await db.Devoir.findByPk(req.params.id, {
                include: [
                    { model: db.Classe, as: 'classe' },
                    { model: db.Enseignant, as: 'enseignant' }
                ]
            });
            if (!devoir) {
                return res.status(404).json({ message: 'Devoir not found' });
            }
            res.json(devoir);
        } catch (error) {
            console.error("Error fetching devoir:", error);
            res.status(500).json({ error: 'Failed to fetch devoir', details: error.message });
        }
    },

    createDevoir: async (req, res) => {
        try {
            const { description, dateLimite, classeId, matiere, enseignantId } = req.body;
            const classe = await db.Classe.findByPk(classeId);
            if (!classe) return res.status(400).json({ error: 'Class not found' });
            const enseignant = await db.Enseignant.findByPk(enseignantId);
            if (!enseignant) return res.status(400).json({ error: 'Teacher not found' });

            const nouveauDevoir = await db.Devoir.create({ description, dateLimite, classeId, matiere, enseignantId });
            res.status(201).json(nouveauDevoir);
        } catch (error) {
            console.error("Error creating devoir:", error);
            res.status(500).json({ error: 'Failed to create devoir', details: error.message });
        }
    },

    getDevoirsByClass: async (req, res) => {
        try {
            const devoirs = await db.Devoir.findAll({
                where: { classeId: req.params.classeId },
                order: [['dateLimite', 'ASC']],
                include: [{ model: db.Enseignant, as: 'enseignant' }]
            });

            const now = new Date();
            for (const devoir of devoirs) {
                if (devoir.dateLimite < now) {
                    const existingSubmission = await db.Soumission.findOne({ where: { devoirId: devoir.id } });
                    if (!existingSubmission) {
                        try {
                            await db.Soumission.create({ devoirId: devoir.id, eleveId: null, dateSoumission: devoir.dateLimite, note: 0 });
                        } catch (submissionError) {
                            console.error("Error creating automatic submission:", submissionError);
                        }
                    }
                }
            }
            res.json(devoirs);
        } catch (error) {
            console.error("Error fetching devoirs by classe:", error);
            res.status(500).json({ error: 'Failed to fetch devoirs', details: error.message });
        }
    }
};

module.exports = DevoirsController;