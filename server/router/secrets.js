'use strict';

const db = require('../../db');

async function getSecretsRoutes(req, res, next) {
  if (!req.session.username) {
    res
      .status(403)
      .render('status/forbidden');
  } else {
    try {
      // Get all the sun shade porducts json
      const sunshades = await db.getSunshades();

      // Send status and render home view
      res
        .status(200)
        .render('secrets', {
          pageId: 'Secrets',
          title: 'Secrets',
          username: req.session.username,
          sunshades: sunshades.map(sunglasses => ({
            ...sunglasses,
          })),
        });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { get: getSecretsRoutes };
