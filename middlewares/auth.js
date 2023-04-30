const jwt = require('jsonwebtoken');

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
    } catch (err) { next(err); }
    return;
  }
  next({ message: 'Некорректный заголовок' });
}

module.exports = auth;
