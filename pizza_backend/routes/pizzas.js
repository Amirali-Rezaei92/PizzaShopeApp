const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all pizzas
router.get('/', (req, res) => {
    db.query('SELECT * FROM pizzas', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// GET single pizza by id
router.get('/:id', (req, res) => {
    const pizzaId = req.params.id;
    db.query('SELECT * FROM pizzas WHERE id = ?', [pizzaId], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// POST create new pizza
router.post('/', (req, res) => {
    const { name, price, description, image } = req.body;

    db.query(
        'INSERT INTO pizzas (name, price, description, image) VALUES (?, ?, ?, ?)',
        [name, price, description, image],
        (err, result) => {
            if (err) throw err;
            res.json({ id: result.insertId, name, price, description, image });
        }
    );
});

// DELETE pizza
router.delete('/:id', (req, res) => {
    const pizzaId = req.params.id;
    db.query('DELETE FROM pizzas WHERE id = ?', [pizzaId], (err) => {
        if (err) throw err;
        res.json({ message: 'Pizza deleted' });
    });
});

// UPDATE pizza
router.put('/:id', (req, res) => {
    const pizzaId = req.params.id;
    const { name, price, description, image } = req.body;

    db.query(
        'UPDATE pizzas SET name=?, price=?, description=?, image=? WHERE id=?',
        [name, price, description, image, pizzaId],
        (err) => {
            if (err) throw err;
            res.json({ message: 'Pizza updated' });
        }
    );
});

module.exports = router;
