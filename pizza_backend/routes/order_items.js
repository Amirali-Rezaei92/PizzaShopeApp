const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all order items
router.get('/', (req, res) => {
    db.query('SELECT * FROM order_items', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// GET items of a specific order
router.get('/order/:id', (req, res) => {
    const orderId = req.params.id;

    db.query(
        `SELECT order_items.*, pizzas.name AS pizza_name 
         FROM order_items 
         JOIN pizzas ON order_items.pizza_id = pizzas.id
         WHERE order_items.order_id = ?`,
        [orderId],
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
});

// POST create new order item
router.post('/', auth, (req, res) => {

    const { order_id, pizza_id, quantity, price } = req.body;

    db.query(
        'INSERT INTO order_items (order_id, pizza_id, quantity, price) VALUES (?, ?, ?, ?)',
        [order_id, pizza_id, quantity, price],
        (err, result) => {
            if (err) throw err;
            res.json({ id: result.insertId, order_id, pizza_id, quantity, price });
        }
    );
});

// DELETE order item
router.delete('/:id', (req, res) => {
    const itemId = req.params.id;

    db.query('DELETE FROM order_items WHERE id = ?', [itemId], (err) => {
        if (err) throw err;
        res.json({ message: 'Order item deleted' });
    });
});

// UPDATE order item
router.put('/:id', (req, res) => {
    const itemId = req.params.id;
    const { quantity, price } = req.body;

    db.query(
        'UPDATE order_items SET quantity=?, price=? WHERE id=?',
        [quantity, price, itemId],
        (err) => {
            if (err) throw err;
            res.json({ message: 'Order item updated' });
        }
    );
});

module.exports = router;
