module.exports.loading = (loaderName, iterator = null, iterations = null, increment = 0.01) => {
  if (iterator === null && iterations === null) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`${loaderName} is 100.00% ||██████████|| ✅  COMPLETE \n`);
  } else {
    const percent = iterations * increment;
    if (iterator % percent === 0) {
      const currentPercentage = (
        Math.trunc(10000 - ((iterator / iterations) * 10000)) / 100).toFixed(2);
      const tenPercentCount = Math.trunc(currentPercentage / 10);
      const loadingBar = '█'.repeat(tenPercentCount).concat('░'.repeat(10 - tenPercentCount));
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`${loaderName} is ${currentPercentage}% ||${loadingBar}||  IN PROGRESS `);
    }
  }
};
