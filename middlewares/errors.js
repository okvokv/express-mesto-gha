// обработка ошибок
// class ServerError extends Error {
// constructor(err, message) {
// super(message);
// this.err = err;
// }
// }

function determineError(err) {
  if (err.name === 'ValidationError') {
    const statusCode = 400;
    const errMessage = 'Ошибка валидации. Переданы некорректные данные';
    return { statusCode, errMessage };
  }
  if (err.name === 'MongooseError' && err.message.includes('timed out')) {
    const statusCode = 400;
    const errMessage = 'Ошибка базы данных.';
    return { statusCode, errMessage };
  }
  if (err.name === 'CastError') {
    const statusCode = 400;
    const errMessage = 'Передан некорректный id';
    return { statusCode, errMessage };
  }
  if (err.message.includes('invalid token') || err.message.includes('Некорректный заголовок')) {
    // ошибка аутентификации, передан некорректный жетон
    const statusCode = 401;
    const errMessage = 'Передан некорректно жетон / Необходима авторизация';
    return { statusCode, errMessage };
  }
  if (err.message.includes('Неправильные почта или пароль') || err.message.includes('password')) {
    // ошибка авторизации преданы неверная почта или пароль
    const statusCode = 401;
    const errMessage = 'Неправильные почта или пароль';
    return { statusCode, errMessage };
  }
  if (err.mesage.includes('Нет прав на удаление')) {
    const statusCode = 403;
    const errMessage = 'Вы не являетесь владельцем данной карточки';
    return { statusCode, errMessage };
  }
  if ((err.name === 'MongooseError' && err.message.includes('users')) || (err.message.includes('Запрашиваемый пользователь не найден'))) {
    const statusCode = 404;
    const errMessage = 'Запрашиваемый/е пользователь/ли не найден/ны';
    return { statusCode, errMessage };
  }
  if ((err.name === 'MongooseError' && err.message.includes('cards')) || err.message.includes('Запрашиваемая карточка не найдена')) {
    const statusCode = 404;
    const errMessage = 'Запрашиваемая/е карточка/ки не найдена/ны';
    return { statusCode, errMessage };
  }
  if (err.message.includes('E11000')) {
    const statusCode = 409;
    const errMessage = 'Пользователь с таким email уже существует';
    return { statusCode, errMessage };
  }
  const statusCode = 500;
  const errMessage = 'На сервере произошла ошибка';
  return { statusCode, errMessage };
}

// const serverError = new ServerError().determineError();
module.exports = determineError;

// Для ошибок созданы классы конструкторы ошибок, наследуемые от Error,
// классы конструкторы ошибок с одинаковым статус-кодом не дублируются

// Все ошибки должны проходить через централизованный обработчик c помощью next,
// отправка ошибок напрямую в контроллере запрещена.
