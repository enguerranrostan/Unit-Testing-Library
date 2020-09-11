const toBeTruthy = value => {
  if (!!value) {
    return true;
  }
  throw new Error('Assertion failed.');
}

module.exports = toBeTruthy;
