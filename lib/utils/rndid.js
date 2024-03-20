'use strict';

module.exports = rndid;

/**
 * Generates a random ID of a specified length that begins with a letter.
 * This is necessary because HTML ID attributes cannot start with a number.
 * 
 * @param {number} len The desired length of the ID. Defaults to 8.
 * @return {string} A unique ID that begins with a letter.
 */
function rndid(len = 8) {
  // Define the characters for the first character (letter)
  const baseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  // Define the characters for the rest of the ID (letters and numbers)
  const allChars = baseChars + '0123456789';
  
  // Ensure the first character is a letter
  let id = baseChars.charAt(Math.floor(Math.random() * baseChars.length));

  // Generate the rest of the ID, which can include both letters and numbers
  for (let i = 1; i < len; i++) {
    id += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  if (document.getElementById(id)) {
    return rndid(len); // Recursively generate a new ID if the current one already exists
  }

  return id;
}