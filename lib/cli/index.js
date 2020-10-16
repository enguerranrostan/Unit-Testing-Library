const path = require('path');
const fs = require('fs');

/**
 * search for test folder
 */
const searchTestFolder = () => (fs.existsSync('test/');

/**
 * get all test files in the test/ folder
 */
const getTestFiles = () => {
  let files = fs.readdirSync('test/');
  return files.length === 0 ? null : files;
}

/**
 * run the test files
 * @param {*} files
 */
function runTestFiles(files = []) {
  files.forEach((file) => {
      require(fs.realpathSync(`test/${file}`))
  });
}

const run = () => {
    if (searchTestFolder()) {
        let files = getTestFiles();
        if (files) {
            runTestFiles(files)
        } else {
            console.error('No test files found.')
        }
    } else {
        console.error(`'test/' folder doesn't exist`)
    }
}

run();
