const db = require('../models');

const SoumissionsController = {
    createSubmission: async (req, res) => {
        try {
            const newSubmission = await db.Soumission.create(req.body);
            res.status(201).json(newSubmission);
        } catch (error) {
            console.error("Error creating submission:", error);
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({ error: 'Invalid devoirId or eleveId' });
            }
            res.status(500).json({ error: 'Failed to create submission', details: error.message });
        }
    },

    getAllSubmissions: async (req, res) => {
        try {
            const submissions = await db.Soumission.findAll({
                include: [
                    { model: db.Eleve, as: 'eleve' },
                    { model: db.Devoir, as: 'devoir' }
                ]
            });
            res.json(submissions);
        } catch (error) {
            console.error("Error fetching submissions:", error);
            res.status(500).json({ error: 'Failed to fetch submissions', details: error.message });
        }
    },

    getSubmissionById: async (req, res) => {
        try {
            const submission = await db.Soumission.findByPk(req.params.id, {
                include: [
                    { model: db.Eleve, as: 'eleve' },
                    { model: db.Devoir, as: 'devoir' }
                ]
            });
            if (!submission) {
                return res.status(404).json({ message: 'Submission not found' });
            }
            res.json(submission);
        } catch (error) {
            console.error("Error fetching submission:", error);
            res.status(500).json({ error: 'Failed to fetch submission', details: error.message });
        }
    },

    getSubmissionsByDevoir: async (req, res) => {
        try {
            const submissions = await db.Soumission.findAll({
                where: { devoirId: req.params.devoirId },
                include: [{ model: db.Eleve, as: 'eleve' }]
            });
            res.json(submissions);
        } catch (error) {
            console.error("Error fetching submissions by devoir:", error);
            res.status(500).json({ error: 'Failed to fetch submissions by devoir', details: error.message });
        }
    },
    updateSubmission: async (req, res) => {
        try {
            const submission = await db.Soumission.findByPk(req.params.id);
            if (!submission) {
                return res.status(404).json({ message: 'Submission not found' });
            }
            await submission.update(req.body);
            res.json(submission);
        } catch (error) {
            console.error("Error updating submission:", error);
            res.status(500).json({ error: 'Failed to update submission', details: error.message });
        }
    },
    deleteSubmission: async (req, res) => {
        try {
            const submission = await db.Soumission.findByPk(req.params.id);
            if (!submission) {
                return res.status(404).json({ message: 'Submission not found' });
            }
            await submission.destroy();
            res.status(204).send(); // 204 No Content for successful deletion
        } catch (error) {
            console.error("Error deleting submission:", error);
            res.status(500).json({ error: 'Failed to delete submission', details: error.message });
        }
    }
};

module.exports = SoumissionsController;