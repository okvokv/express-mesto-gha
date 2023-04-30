// обработка ошибок
// class ServerError extends Error {
// constructor(err, message) {
// super(message);
// this.err = err;
// }
// }

function determineError() {
  if (this.err.name === 'ValidationError') {
    const statusCode = 400;
    const errmessage = 'Ошибка валидации. Переданы некорректные данные';
    console.log(statusCode);
    return { statusCode, errmessage };
  }
  if ((this.err.name === 'MongooseError') && (this.err.message.includes('timed out'))) {
    const statusCode = 400;
    const errmessage = 'Ошибка базы данных.';
    console.log(statusCode);
    return { statusCode, errmessage };
  }
  if (this.err.name === 'CastError') {
    const statusCode = 400;
    const errmessage = 'Передан некорректный id';
    console.log(statusCode);
    return { statusCode, errmessage };
  }
  if (this.err.name === 'JWT') {                          //---//
    // ошибка аутентификации
    const statusCode = 401;
    const errmessage = 'Передан некорректный жетон';
    console.log(statusCode);
    return { statusCode, errmessage };
  }
  if (this.err.name === 'JWT1') {                          //---//
    // ошибка авторизации преданы неверная почта или пароль
    const statusCode = 401;
    const errmessage = 'Неправильные почта или пароль';
    console.log(statusCode);
    return { statusCode, errmessage };
  }
  if (this.err.name === ' ') {                            //---//
    const statusCode = 403;
    const errmessage = 'Вы не являетесь владельцем данной карточки';
    console.log(statusCode);
    return { statusCode, errmessage };
  }
  if ((this.err.name === 'MongooseError') && (this.err.message.includes('users'))) {
    const statusCode = 404;
    const errmessage = 'Запрашиваемый/е пользователь/ли не найден/ны';
    console.log(statusCode);
    return { statusCode, errmessage };
  }
  if ((this.err.name === 'MongooseError') && (this.err.message.includes('cards'))) {
    const statusCode = 404;
    const errmessage = 'Запрашиваемая/е карточка/ки не найдена/ны';
    console.log(statusCode);
    return { statusCode, errmessage };
  }
  if (this.err.message.includes('E11000')) {
    const statusCode = 409;
    const errmessage = 'Пользователь с таким email уже существует';
    console.log('база', statusCode);
    return { statusCode, errmessage };
  }
  const statusCode = 500;
  const message = 'На сервере произошла ошибка';
  console.log(statusCode);
  return { statusCode, message };
}

// const serverError = new ServerError().determineError();
module.exports = determineError;

// 401 — передан неверный логин или пароль, этот код ошибки также
// возвращает аутентификационный middleware, если передан неверный JWT;
// 403 — попытка удалить чужую карточку;
// 409 — при регистрации указан email, который уже существует на сервере.

// Для ошибок созданы классы конструкторы ошибок, наследуемые от Error,
// классы конструкторы ошибок с одинаковым статус-кодом не дублируются

// Все ошибки должны проходить через централизованный обработчик,
// отправка ошибок напрямую в контроллере запрещена.

// При обработке ошибок в блоке catch они не выбрасываются через throw,
// а передаются в централизованный обработчик ошибок с помощью next .
