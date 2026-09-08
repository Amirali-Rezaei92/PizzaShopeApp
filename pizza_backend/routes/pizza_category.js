const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all relations
router.get('/', (req, res) => {
    db.query('SELECT * FROM pizza_category', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// GET categories of a pizza
router.get('/pizza/:id', (req, res) => {
    const pizzaId = req.params.id;

    db.query(
        `SELECT categories.* 
         FROM pizza_category 
         JOIN categories ON pizza_category.category_id = categories.id
         WHERE pizza_category.pizza_id = ?`,
        [pizzaId],
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
});

// GET pizzas of a category
router.get('/category/:id', (req, res) => {
    const categoryId = req.params.id;

    db.query(
        `SELECT pizzas.* 
         FROM pizza_category 
         JOIN pizzas ON pizza_category.pizza_id = pizzas.id
         WHERE pizza_category.category_id = ?`,
        [categoryId],
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
});

// POST create relation
router.post('/', (req, res) => {
    const { pizza_id, category_id } = req.body;

    db.query(
        'INSERT INTO pizza_category (pizza_id, category_id) VALUES (?, ?)',
        [pizza_id, category_id],
        (err, result) => {
            if (err) throw err;
            res.json({ id: result.insertId, pizza_id, category_id });
        }
    );
});

// DELETE relation
router.delete('/:id', (req, res) => {
    const relationId = req.params.id;

    db.query('DELETE FROM pizza_category WHERE id = ?', [relationId], (err) => {
        if (err) throw err;
        res.json({ message: 'Relation deleted' });
    });
});

module.exports = router;
