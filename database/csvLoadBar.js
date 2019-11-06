module.exports.loading = (loaderName, iterator = null, iterations = null, increment = 0.01) => {
  if (iterator === null && iterations === null) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`${loaderName} is 100.00% complete\n`);
  } else {
    const percent = iterations * increment;
    if (iterator % percent === 0) {
      const currentPercentage = (
        Math.trunc(10000 - ((iterator / iterations) * 10000)) / 100).toFixed(2);
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`${loaderName} is ${currentPercentage}% complete`);
    }
  }
};
