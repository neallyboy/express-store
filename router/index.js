'use strict';

const express = require('express');

const router = express.Router();

// Register route
router.get('/register', (req, res) => {
  res.sendStatus(200);
  // res.send('Register User');
});

// Login route
router.get('/login', (req, res) => {
  res.sendStatus(200);
  // res.send('Login User');
});

// All Product route
router.get('/product', (req, res) => {
  // res.send('All Products');
  res.sendStatus(200);
});

// Product by ID route
router.get('/product/:id', (req, res) => {
  // res.send('Product by id');
  res.sendStatus(200);
});

// Create Product route
router.post('/product', (req, res) => {
  // res.send('Create product');
  res.sendStatus(201);
});

// Update Product route
router.put('/product/:id', (req, res) => {
  // res.send('Update product');
  res.sendStatus(200);
});

// Delete by Id route
router.delete('/product/:id', (req, res) => {
  // res.send('Delete product');
  res.sendStatus(204);
});

module.exports = router;
