const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Get all cards
router.get('/', (req, res) => {
  connection.query('SELECT * FROM cards', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a single card by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM cards WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Card not found' });
    res.json(results[0]);
  });
});

// Create a new card
router.post('/', (req, res) => {
  const { frontText, backText } = req.body;
  connection.query('INSERT INTO cards (frontText, backText) VALUES (?, ?)', [frontText, backText], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, frontText, backText });
  });
});

// Update a card
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { frontText, backText } = req.body;
  connection.query('UPDATE cards SET frontText = ?, backText = ? WHERE id = ?', [frontText, backText, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, frontText, backText });
  });
});

// Delete a card
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM cards WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
});

module.exports = router;
