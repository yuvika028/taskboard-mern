const mongoose = require('mongoose');

// Lets rejected promises in async handlers reach the error middleware
exports.asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

exports.errorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json( { message: 'Invalid JSON body' });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors).map((e) => e.message).join(', ');
    return res.status(400).json({ message });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: 'Invalid id' });
  }
  console.error(err);
  res.status(500).json({ message: 'Server error' });
};
