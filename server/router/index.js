'use strict';

const express = require('express');
const homeRoutes = require('./home');
const secretsRoutes = require('./secrets');
const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const registerRoutes = require('./register');

const db = require('../../db');

const router = express.Router();

// Home route
router.get('/', homeRoutes.get);

// Secrets page
router.get('/secrets', secretsRoutes.get);

// Register route
router.get('/register', registerRoutes.get);
router.post('/register', registerRoutes.post);

// Login route
router.get('/login', loginRoutes.get);
router.post('/login', loginRoutes.post);

// Logout
router.get('/logout', logoutRoutes.get);

// All Product route
router.get('/product', async (req, res, next) => {
  try {
    // Get all the sun shade porducts json
    const allSunshades = await db.getSunshades();

    // Send status and all the sun shade porducts json
    res
      .status(200)
      .send(allSunshades);
  } catch (error) {
    next(error);
  }
});

// Product by ID route
router.get('/product/:id', async (req, res, next) => {
  try {
    // Get Sun shade by ID
    const sunshade = await db.getSunshadesById(req.params.id);

    // Send status and sun shade product json
    res
      .json(sunshade)
      .status(200);
  } catch (error) {
    next(error);
  }
});

// Create Product route
router.post('/product', async (req, res, next) => {
  try {
    // Create new sunshade
    const newSunshade = await db.createSunshade({
      id: req.body.id,
      brand: req.body.brand,
      model: req.body.model,
      color: req.body.color,
      gender: req.body.gender,
      price: req.body.price,
    });

    // Send status and the new sunshade json
    res
      .json(newSunshade)
      .status(201);
  } catch (error) {
    next(error);
  }
});

// Update Product route
router.put('/product/:id', async (req, res, next) => {
  // res.send('Update product');
  try {
    await db.updateSunshade(req.body);
    const allSunshades = await db.getSunshades();

    res
      .json(allSunshades)
      .status(200);
  } catch (error) {
    next(error);
  }
});

// Delete by Id route
router.delete('/product/:id', async (req, res, next) => {
  try {
    await db.deleteSunshade(req.params.id);
    const allSunshades = await db.getSunshades();

    res
      .json(allSunshades)
      .status(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
