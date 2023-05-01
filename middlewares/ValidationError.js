class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = 'ValidationError';
    this.message = 'Ошибка валидации. Переданы некорректные данные';
  }
}

module.exports = ValidationError;
