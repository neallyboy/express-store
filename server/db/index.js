'use strict';

const util = require('util');
const path = require('path');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const filePath = path.resolve('server/db/sunshades.json');

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

module.exports = {
  getSunshadesById: getSunshadesById,
  getSunshades: readSunshades,
  createSunshade: createSunshade,
};
