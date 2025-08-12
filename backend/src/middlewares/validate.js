// backend/src/middlewares/validate.js
const validate = (schema) => (req, res, next) => {
  // very simple - schema is expected to be a function that throws or returns errors
  try {
    if (typeof schema === 'function') schema(req);
    next();
  } catch (err) {
    res.status(400).json({ error: err.message || 'Validation error' });
  }
};

module.exports = validate;
