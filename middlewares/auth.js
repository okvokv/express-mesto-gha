const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./UnauthorizedError');

// проверка жетона при аутентификации пользователя
function auth(req, res, next) {
  const { authorization } = req.headers; // req.cookies;
  req.user = {};
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');
    try {
      const payload = jwt.verify(token, 'super-strong-secret');
      req.user = payload;
      next();
    } catch (err) { next(new UnauthorizedError('Некорректный жетон. Необходима авторизация')); }
    return;
  }
  next(new UnauthorizedError('Некорректный заголовок'));
}

module.exports = auth;
