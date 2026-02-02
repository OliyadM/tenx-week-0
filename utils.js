// utils.js
// Exports utility functions used across the project.

/**
 * Calculate the number of days between two dates.
 * Accepts Date objects or date strings parsable by Date.
 * Returns a non-negative integer (whole days).
 *
 * Implementation notes:
 * - Normalizes both dates to UTC midnight to avoid timezone/daylight issues.
 * - Returns Math.abs difference in days, rounded to nearest integer.
 *
 * Examples:
 *  daysBetween('2020-01-01', '2020-01-02') === 1
 */
function daysBetween(a, b) {
  const toDate = (v) => {
    if (v instanceof Date) return v;
    const d = new Date(v);
    if (isNaN(d)) throw new TypeError('Invalid date: ' + v);
    return d;
  };

  const da = toDate(a);
  const db = toDate(b);

  // Normalize to UTC midnight to avoid DST/timezone differences
  const utcMidnight = (d) => Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());

  const diffMs = Math.abs(utcMidnight(da) - utcMidnight(db));
  const dayMs = 24 * 60 * 60 * 1000;
  return Math.round(diffMs / dayMs);
}

/**
 * Calculate Body Mass Index (BMI).
 *
 * By default expects weight in kilograms and height in meters.
 * Options can be provided to use other units:
 *  - { units: 'imperial' } expects weight in pounds and height in inches (lb/in)
 *  - { heightUnit: 'cm' } expects height in centimeters (with weight in kg)
 *
 * Returns BMI rounded to 2 decimal places.
 * Throws TypeError for invalid inputs.
 *
 * Examples:
 *  calculateBMI(70, 1.75) === 22.86
 */
function calculateBMI(weight, height, options = {}) {
  if (typeof weight !== 'number' || typeof height !== 'number' || !isFinite(weight) || !isFinite(height)) {
    throw new TypeError('weight and height must be finite numbers');
  }

  let w = weight;
  let h = height;

  if (options.units === 'imperial') {
    // weight in pounds, height in inches -> convert to kg/m
    w = weight * 0.45359237; // lb to kg
    h = height * 0.0254; // in to m
  } else if (options.heightUnit === 'cm') {
    // height provided in centimeters
    h = height / 100;
  }

  if (h <= 0 || w <= 0) throw new TypeError('weight and height must be positive');

  const bmi = w / (h * h);
  return Math.round(bmi * 100) / 100;
}

module.exports = { daysBetween, calculateBMI };
