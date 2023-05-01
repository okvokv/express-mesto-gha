// const { Joi } = require('celebrate');
const ValidationError = require('./ValidationError');
const UnauthorizedError = require('./UnauthorizedError');
const NotFoundError = require('./NotFoundError');
const WrongEmailError = require('./WrongEmailError');
const InternalServerError = require('./InternalServerError');

function determineError(err, next) {
  if (err instanceof ValidationError) {
    return next(new ValidationError('Ошибка валидации. Переданы некорректные данные'));
  }
  // if (err.isJoi) {
  //  return next(new ValidationError('Ошибка валидации. Переданы некорректные данные'));
  // }
  if (err.name === 'MongooseError' && err.message.includes('timed out')) {
    return next(new ValidationError('Ошибка базы данных'));
  }
  if (err.name === 'CastError') {
    return next(new ValidationError('Передан некорректный id'));
  }
  if (err.message.includes('invalid token')) {
    // ошибка аутентификации
    return next(new UnauthorizedError('Передан некорректно жетон / Необходима авторизация'));
  }
  if (err.message.includes('password')) {
    // ошибка авторизации
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }
  if (err.name === 'MongooseError' && err.message.includes('users')) {
    return next(new NotFoundError('Запрашиваемый/е пользователь/ли не найден/ны'));
  }
  if (err.name === 'MongooseError' && err.message.includes('cards')) {
    return next(new NotFoundError('Запрашиваемая/е карточка/ки не найдена/ны'));
  }
  if (err.message.includes('E11000')) {
    return next(new WrongEmailError('Пользователь с таким email уже существует'));
  }
  return next(new InternalServerError('На сервере произошла ошибка'));
}

module.exports = determineError;
