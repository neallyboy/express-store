'use strict';

const db = require('../../db');

async function getHomeRoute(req, res, next) {
  try {
    // Get all the sun shade porducts json
    const sunshades = await db.getSunshades();

    // Send status and render home view
    res
      .status(200)
      .render('home', {
        pageId: 'home',
        title: 'Home',
        username: req.session.username,
        sunshades: sunshades.map(sunglasses => ({
          ...sunglasses,
        })),
      });
  } catch (error) {
    next(error);
  }
}

module.exports = { get: getHomeRoute };
