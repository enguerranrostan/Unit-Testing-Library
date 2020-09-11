const { beforeAll, expect, beforeEach, afterEach, test, end, group } = require('unit-testing-library');
const numberUtils = require("../src/number-utils");

// Group isEven tests
beforeAll(() => console.log("BeforeAll 0"));
group("group 0", () => {
  beforeEach(() => console.log("beforeEach group 0"));
  afterEach(() => console.log("afterEach group 0"));
  beforeAll(() => console.log("BeforeAll 1"));
  group("group 1", () => {
    beforeEach(() => console.log("beforeEach group 1"));
      afterEach(() => console.log("afterEach group 1"));
    test("Returns true for even number", () => {
      expect(numberUtils.isEven(4)).toBeTruthy(2);
    });

    test("This test should fail", () => {
      expect(numberUtils.isEven(5)).toBeTruthy();
    });
  });

  group("group 1.1", () => {
    test("Returns false for odd number", () => {
      expect(!numberUtils.isEven(3)).toBeTruthy();
    });
  })
});

end();
