const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all categories
router.get('/', (req, res) => {
    db.query('SELECT * FROM categories', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// GET single category by id
router.get('/:id', (req, res) => {
    const categoryId = req.params.id;
    db.query('SELECT * FROM categories WHERE id = ?', [categoryId], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// POST create new category
router.post('/', auth, (req, res) => {

    const { name, description } = req.body;

    db.query(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [name, description],
        (err, result) => {
            if (err) throw err;
            res.json({ id: result.insertId, name, description });
        }
    );
});

// DELETE category
router.delete('/:id', auth, (req, res) => {

    const categoryId = req.params.id;
    db.query('DELETE FROM categories WHERE id = ?', [categoryId], (err) => {
        if (err) throw err;
        res.json({ message: 'Category deleted' });
    });
});

// UPDATE category
router.put('/:id', (req, res) => {
    const categoryId = req.params.id;
    const { name, description } = req.body;

    db.query(
        'UPDATE categories SET name=?, description=? WHERE id=?',
        [name, description, categoryId],
        (err) => {
            if (err) throw err;
            res.json({ message: 'Category updated' });
        }
    );
});

module.exports = router;
