const jwt = require('jsonwebtoken');

// проверка жетона при аутентификации пользователя
function auth(req, res, next) {
  const { authorization } = req.cookies;
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');

    try {
      const payload = jwt.verify(token, 'super-strong-secret');
      req.user = payload;
      next();
      return;
    } catch (err) { next(err); return; } // не корректный жетон
  }
  res.status(401).send({ message: 'Необходима авторизация' });
}

module.exports = auth;