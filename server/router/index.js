'use strict';

const express = require('express');
const db = require('../../db');

const router = express.Router();

// Home route
router.get('/', async (req, res, next) => {
  try {
    // Get all the sun shade porducts json
    const sunshades = await db.getSunshades();

    // Send status and render home view
    res
      .status(200)
      .render('home', {
        pageId: 'home',
        title: 'Home',
        sunshades: sunshades.map(sunglasses => ({
          ...sunglasses,
        })),
      });
  } catch (error) {
    next(error);
  }
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
