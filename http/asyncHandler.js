const asyncHandler = fn => (...args) => {
  const next = args[2];
  Promise.resolve(fn(...args)).catch(next);
};

module.exports = { asyncHandler };
