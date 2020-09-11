const chalk = require("chalk");
const matchers = require("./matchers");

const log = console.log;

const testSummary = {
  success: 0,
  fail: 0
}

const beforeAllStack = [];
const afterAllStack = [];
const beforeEachStack = [];
const afterEachStack = [];

const group = (title, cb) => {
  runEveryBeforeAll();

  beforeEachStack.push([]);
  afterEachStack.push([]);

  log(chalk.yellow(`\n => ${title}\n`));

  runEveryAfterAll();

  beforeAllStack.pop();
  afterAllStack.pop();

  cb();

  beforeEachStack.pop();
  afterEachStack.pop();
}

const beforeAll = cb => beforeAllStack.push(cb);
const afterAll = cb => afterAllStack.push(cb);
const beforeEach = cb => beforeEachStack[beforeEachStack.length - 1].push(cb);
const afterEach = cb => afterEachStack[afterEachStack.length - 1].push(cb);

const runEveryBeforeAll = () => beforeAllStack.forEach(beforeAll => beforeAll());
const runEveryAfterAll = () => afterAllStack.forEach(afterAll => afterAll());
const runEveryBeforeEach = () => beforeEachStack.forEach(group => group.forEach(beforeEach => beforeEach()));
const runEveryAfterEach = () => afterEachStack.forEach(group => group.forEach(afterEach => afterEach()));

const test = (title, cb) => {
  runEveryBeforeEach();
  try {
    cb();
    log(chalk.black.bgGreen(" OK ") + " " + chalk.green(`${title}`));
    testSummary.success++;
  } catch(err) {
    log(chalk.bgRed(" FAIL ") + " " + chalk.red(`${title}`));
    log(chalk.red(err.stack));
    testSummary.fail++;
  }
  runEveryAfterEach();
}

const expect = value => {
  const expectation = {};
  Object.keys(matchers).forEach(matcherName => {
    const matcher = matchers[matcherName];
    expectation[matcherName] = expected => matcher(value, expected);
  })
  return expectation;
}

end = () => {
  log("\n ---------- \n");
  log(" Test Summary:\n");
  log(chalk.green(`  Success: ${testSummary.success}`));
  log(chalk.red(`  Fail: ${testSummary.fail}`));
  process.exit(0);
}

module.exports = { beforeAll, expect, beforeEach, afterEach, test, group, end };
