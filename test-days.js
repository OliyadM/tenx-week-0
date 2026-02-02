const { daysBetween } = require('./utils');

function assertEqual(a, b, message) {
  if (a !== b) {
    console.error(`FAIL: ${message} — expected ${b}, got ${a}`);
    process.exitCode = 1;
  } else {
    console.log(`PASS: ${message}`);
  }
}

// Tests
assertEqual(daysBetween('2020-01-01', '2020-01-02'), 1, 'simple next day');
assertEqual(daysBetween('2020-01-01', '2020-01-01'), 0, 'same day');
assertEqual(daysBetween(new Date('2020-02-28'), new Date('2020-03-01')), 2, 'leap year 2020 Feb28-Mar1');
assertEqual(daysBetween('2021-03-01T23:00:00Z', '2021-03-02T01:00:00Z'), 1, 'different times same UTC day');

// invalid input
try {
  daysBetween('not-a-date', '2020-01-01');
  console.error('FAIL: invalid input did not throw');
  process.exitCode = 1;
} catch (err) {
  console.log('PASS: invalid input throws');
}

console.log('Done tests.');
