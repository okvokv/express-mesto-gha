const ValidationError = require('./ValidationError');
// const UnauthorizedError = require('./UnauthorizedError');
const WrongEmailError = require('./WrongEmailError');

function determineError(err, next) {
  console.log(err);
  if (err instanceof ValidationError) {
    return next(new ValidationError('Ошибка валидации. Переданы некорректные данные'));
  }
  if (err.name === 'CastError') {
    return next(new ValidationError('Передан некорректный id'));
  }
  if (err.message.includes('E11000')) {
    return next(new WrongEmailError('Пользователь с таким email уже существует'));
  }
  return next(err);
}

module.exports = determineError;
