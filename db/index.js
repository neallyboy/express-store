'use strict';

const util = require('util');
const path = require('path');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const filePath = path.resolve('db/sunshades.json');
const userDbPath = path.resolve('db/users.json');

/**
 * Reads and returns contents of sunshades.json
 */
async function readSunshades() {
  const json = await readFile(filePath);
  return JSON.parse(json);
}

/**
 * Gets an item by ID
 *   1) Get all items
 *   2) Get an item patching the passed ID
 *   3) Return the matching item
 */
async function getSunshadesById(id) {
  // 1
  const sunshades = await readSunshades();

  // 2
  let matchedSunshade;
  sunshades.forEach((sunshade) => {
    if (sunshade.id === id) {
      matchedSunshade = sunshade;
    }
  });

  // 3
  return matchedSunshade;
}

/**
 * Replaces the contents of sunshades.json
 */
async function writeSunshades(sunshades) {
  const json = JSON.stringify(sunshades, null, 2);
  return writeFile(filePath, json);
}

/**
 * Create item
 * What we pass into `writeSunshades` must be everyting from the
 * JSON file, except the `newSunshades` is added to it
 *  1) Get all items
 *  2) Add the new item to the end of it
 *  3) Write these new items
 */
async function createSunshade(newSunshades) {
  // 1
  const sunshades = await readSunshades();
  // 2
  sunshades.push(newSunshades);
  // 3
  return writeSunshades(sunshades);
}

/**
 * Update item
 */
async function updateSunshade(updSunshades) {
  // 1
  const sunshades = await readSunshades();
  // 2
  sunshades.forEach((sunshade) => {
    if (sunshade.id === updSunshades.id) {
      sunshade.brand = updSunshades.brand;
      sunshade.model = updSunshades.model;
      sunshade.color = updSunshades.color;
      sunshade.gender = updSunshades.gender;
      sunshade.price = updSunshades.price;
    }
  });
  // 3
  return writeSunshades(sunshades);
}


/**
 * Delete item
 */
async function deleteSunshade(delSunshades) {
  // 1
  const sunshades = await readSunshades();
  // 2
  sunshades.forEach((sunshade, i) => {
    if (sunshade.id === delSunshades) {
      sunshades.splice(i, 1);
    }
  });
  // 3
  return writeSunshades(sunshades);
}

/**
 * Reads the file `users.json` and parses its JSON
 */
async function readUsers() {
  const json = await readFile(userDbPath);
  return JSON.parse(json);
}


/**
 * Writes to the `users.json` file
 */
function writeUsers(users) {
  return writeFile(userDbPath, JSON.stringify(users, null, 2));
}


/**
 * Determines if a user with a particular username already exists or not
 * @param {string} username
 * @returns {Promise<boolean>} whether a user exists or not
 */
function usernameExists(username) {
  return readUsers()
    .then((users) => {
      let exists = false;

      users.forEach((user) => {
        if (user.username === username) {
          exists = true;
        }
      });

      return exists;
    });
}


/**
 * Adds a user to the database
 * @param {object} user
 * @returns {Promise<undefined>}
 */
async function addUser(newUser) {
  const users = await readUsers();
  users.push(newUser); // Add new user to users array
  await writeUsers(users);
}


/**
 * Get user password hash
 * @param {string} username
 * @returns {Promise<string>}
 */
async function getUserPasswordHash(username) {
  const users = await readUsers();

  let match;
  users.forEach((user) => {
    if (user.username === username) {
      match = user;
    }
  });

  if (!match) {
    throw new Error('User does not exist.');
  }

  return match.password;
}

module.exports = {
  getSunshadesById: getSunshadesById,
  getSunshades: readSunshades,
  createSunshade: createSunshade,
  deleteSunshade: deleteSunshade,
  updateSunshade: updateSunshade,
  usernameExists: usernameExists,
  addUser: addUser,
  getUserPasswordHash: getUserPasswordHash,
};
