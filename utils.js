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

module.exports = { daysBetween };
