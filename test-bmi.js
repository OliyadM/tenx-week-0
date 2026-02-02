const { calculateBMI } = require('./utils');

function assertEqual(a, b, message) {
  if (a !== b) {
    console.error(`FAIL: ${message} — expected ${b}, got ${a}`);
    process.exitCode = 1;
  } else {
    console.log(`PASS: ${message}`);
  }
}

// Metric: 70kg, 1.75m -> 22.86
assertEqual(calculateBMI(70, 1.75), 22.86, 'metric kg/m');

// Imperial: 154.324 lb (≈70kg), 68.8976 in (≈1.75m)
assertEqual(calculateBMI(154.324, 68.8976, { units: 'imperial' }), 22.86, 'imperial lb/in');

// Height in cm
assertEqual(calculateBMI(70, 175, { heightUnit: 'cm' }), 22.86, 'height in cm');

// invalid input
try {
  calculateBMI('70', 1.75);
  console.error('FAIL: invalid input did not throw');
  process.exitCode = 1;
} catch (err) {
  console.log('PASS: invalid input throws');
}

console.log('Done BMI tests.');
