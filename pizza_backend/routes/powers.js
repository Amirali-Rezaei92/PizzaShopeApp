const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all powers
router.get('/', (req, res) => {
    db.query('SELECT * FROM powers', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// GET single power
router.get('/:id', (req, res) => {
    const powerId = req.params.id;

    db.query('SELECT * FROM powers WHERE id = ?', [powerId], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// POST create new power
router.post('/', (req, res) => {
    const { name, description } = req.body;

    db.query(
        'INSERT INTO powers (name, description) VALUES (?, ?)',
        [name, description],
        (err, result) => {
            if (err) throw err;
            res.json({ id: result.insertId, name, description });
        }
    );
});

// UPDATE power
router.put('/:id', (req, res) => {
    const powerId = req.params.id;
    const { name, description } = req.body;

    db.query(
        'UPDATE powers SET name=?, description=? WHERE id=?',
        [name, description, powerId],
        (err) => {
            if (err) throw err;
            res.json({ message: 'Power updated' });
        }
    );
});

// DELETE power
router.delete('/:id', (req, res) => {
    const powerId = req.params.id;

    db.query('DELETE FROM powers WHERE id = ?', [powerId], (err) => {
        if (err) throw err;
        res.json({ message: 'Power deleted' });
    });
});

module.exports = router;
