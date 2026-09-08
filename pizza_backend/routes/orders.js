const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all orders
router.get('/', (req, res) => {
    db.query('SELECT * FROM orders', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// GET orders of a specific user
router.get('/user/:id', (req, res) => {
    const userId = req.params.id;

    db.query('SELECT * FROM orders WHERE user_id = ?', [userId], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// GET single order
router.get('/:id', (req, res) => {
    const orderId = req.params.id;

    db.query('SELECT * FROM orders WHERE id = ?', [orderId], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// POST create new order
router.post('/', (req, res) => {
    const { user_id, total_price, status } = req.body;

    db.query(
        'INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)',
        [user_id, total_price, status],
        (err, result) => {
            if (err) throw err;
            res.json({ id: result.insertId, user_id, total_price, status });
        }
    );
});

// UPDATE order status
router.put('/:id', (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;

    db.query(
        'UPDATE orders SET status=? WHERE id=?',
        [status, orderId],
        (err) => {
            if (err) throw err;
            res.json({ message: 'Order updated' });
        }
    );
});

// DELETE order
router.delete('/:id', (req, res) => {
    const orderId = req.params.id;

    db.query('DELETE FROM orders WHERE id = ?', [orderId], (err) => {
        if (err) throw err;
        res.json({ message: 'Order deleted' });
    });
});

module.exports = router;
