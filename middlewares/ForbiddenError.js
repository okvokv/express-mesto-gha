class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = 'ForbiddenError';
    this.message = 'Нет прав на удаление';
  }
}
module.exports = ForbiddenError;
