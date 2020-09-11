const numberUtils = {};

numberUtils.isEven = number => (number % 2 === 0);

numberUtils.createRange = (from, to) => {
  const range = [];
  for (let i = from; i <= to; i++) {
    range.push(i);
  }
  return range;
};

module.exports = numberUtils;
