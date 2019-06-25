'use strict';

async function getHomeRoute(req, res, next) {
  // Send status and render home view
  res
    .status(200)
    .render('home', {
      pageId: 'home',
      title: 'Home',
      username: req.session.username,
    });
}

module.exports = { get: getHomeRoute };
