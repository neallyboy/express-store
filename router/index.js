'use strict';

const express = require('express');
const db = require('../server/db');

const router = express.Router();

// Home route
router.get('/', async (req, res, next) => {
  const sunshades = await db.getSunshades();

  // res.sendStatus(200);
  res.render('home', {
    pageId: 'home',
    title: 'Home',
    sunshades: sunshades.map(sunglasses => ({
      ...sunglasses,
    })),
  });
});

// Register route
router.get('/register', (req, res, next) => {
  res.sendStatus(200);
  // res.send('Register User');
});

// Login route
router.get('/login', (req, res, next) => {
  res.sendStatus(200);
  // res.send('Login User');
});

// All Product route
router.get('/product', (req, res, next) => {
  // res.send('All Products');
  res.sendStatus(200);
});

// Product by ID route
router.get('/product/:id', (req, res, next) => {
  // res.send('Product by id');
  res.sendStatus(200);
});

// Create Product route
router.post('/product', (req, res, next) => {
  // res.send('Create product');
  res.sendStatus(201);
});

// Update Product route
router.put('/product/:id', (req, res, next) => {
  // res.send('Update product');
  res.sendStatus(200);
});

// Delete by Id route
router.delete('/product/:id', (req, res, next) => {
  // res.send('Delete product');
  res.sendStatus(204);
});

module.exports = router;
