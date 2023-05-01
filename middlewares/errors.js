const ValidationError = require('./ValidationError');
const WrongEmailError = require('./WrongEmailError');

function determineError(err, next) {
  console.log(err);
  if (err instanceof ValidationError) {
    return next(new ValidationError());
  }
  if (err.name === 'CastError') {
    return next(new ValidationError('Передан некорректный id'));
  }
  if (err.message.includes('E11000')) {
    return next(new WrongEmailError());
  }
  return next(err);
}

module.exports = determineError;
