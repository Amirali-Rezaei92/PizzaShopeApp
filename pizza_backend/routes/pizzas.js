const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require("multer");

// Multer storage config
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


// =========================
// GET ALL PIZZAS (with category name)
// =========================
router.get('/', (req, res) => {
    const query = `
        SELECT pizzas.*, categories.name AS category_name
        FROM pizzas
        LEFT JOIN categories ON pizzas.category_id = categories.id
        ORDER BY pizzas.id DESC
    `;

    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});


// =========================
// GET SINGLE PIZZA BY ID
// =========================
router.get('/:id', (req, res) => {
    const pizzaId = req.params.id;

    const query = `
        SELECT pizzas.*, categories.name AS category_name
        FROM pizzas
        LEFT JOIN categories ON pizzas.category_id = categories.id
        WHERE pizzas.id = ?
    `;

    db.query(query, [pizzaId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
});


// =========================
// ADMIN — ADD NEW PIZZA (WITH IMAGE)
// =========================
router.post('/admin/add', auth, admin, upload.single("image"), (req, res) => {
    const { name, price, description, ingredients, category_id } = req.body;
    const image_url = req.file ? req.file.filename : null;

    const query = `
        INSERT INTO pizzas (name, price, description, ingredients, category_id, image_url)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [name, price, description, ingredients, category_id, image_url],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });

            res.json({
                id: result.insertId,
                name,
                price,
                description,
                ingredients,
                category_id,
                image_url
            });
        }
    );
});


// =========================
// ADMIN — DELETE PIZZA
// =========================
router.delete('/admin/delete/:id', auth, admin, (req, res) => {
    const pizzaId = req.params.id;

    db.query('DELETE FROM pizzas WHERE id = ?', [pizzaId], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Pizza deleted' });
    });
});


// =========================
// ADMIN — UPDATE PIZZA
// =========================
router.put('/admin/edit/:id', auth, admin, upload.single("image"), (req, res) => {
    const pizzaId = req.params.id;
    const { name, price, description, ingredients, category_id } = req.body;

    const image_url = req.file ? req.file.filename : req.body.image_url;

    const query = `
        UPDATE pizzas 
        SET name=?, price=?, description=?, ingredients=?, category_id=?, image_url=? 
        WHERE id=?
    `;

    db.query(
        query,
        [name, price, description, ingredients, category_id, image_url, pizzaId],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Pizza updated' });
        }
    );
});


// =========================
// ADMIN — GET ALL PIZZAS (NO JOIN)
// =========================
router.get('/admin/all', auth, admin, (req, res) => {
    db.query("SELECT * FROM pizzas ORDER BY id DESC", (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

module.exports = router;
