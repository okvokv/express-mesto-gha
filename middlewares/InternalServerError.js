class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.name = 'InternalServerError';
    this.message = 'На сервере произошла ошибка';
  }
}

module.exports = InternalServerError;
