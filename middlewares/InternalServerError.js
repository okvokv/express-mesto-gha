class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.name = 'NotFoundError';
  }
}

module.exports = InternalServerError;
