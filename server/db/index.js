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

module.exports = {
  getAllCountries: readSunshades,
};
