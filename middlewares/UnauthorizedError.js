class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = 'UnauthorizedError';
    if (message.includes('token')) {
      this.message = 'Некорректный жетон. Необходима авторизация';
      return;
    }
    if (message.includes('header')) {
      this.message = 'Некорректный заголовок';
      return;
    }
    this.message = 'Неправильные почта или пароль';
  }
}

module.exports = UnauthorizedError;
