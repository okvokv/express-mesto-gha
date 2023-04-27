// обработка ошибок
class serverError extends Error {
  // constructor(message) {
  //  super(message);
  // this.err.name = err.name;
  // }

  determineError() {
    if (this.err.name === 'ValidationError') {
      const statusCode = 400;
      const message = 'Ошибка валидации. Переданы некорректные данные';
      console.log(statusCode);
      return { statusCode, message };
    }
    if ((this.err.name === 'MongooseError') && (this.err.message.includes('timed out'))) {
      const statusCode = 400;
      const message = 'Ошибка базы данных.';
      console.log(statusCode);
      return { statusCode, message };
    }
    if (this.err.name === 'CastError') {
      const statusCode = 400;
      const message = 'Передан некорректный id';
      console.log(statusCode);
      return { statusCode, message };
    }
    if (this.err.name === 'JWT') {                          //---//
      // ошибка аутентификации
      const statusCode = 401;
      const message = 'Передан некорректный жетон';
      console.log(statusCode);
      return { statusCode, message };
    }
    if (this.err.name === 'JWT') {                          //---//
      // ошибка авторизации преданы неверная почта или пароль
      const statusCode = 401;
      const message = 'Неправильные почта или пароль';
      console.log(statusCode);
      return { statusCode, message };
    }
    if (this.err.name === ' ') {                            //---//
      const statusCode = 403;
      const message = 'Вы не являетесь владельцем данной карточки';
      console.log(statusCode);
      return { statusCode, message };
    }
    if ((this.err.name === 'MongooseError') && (this.err.message.includes('users'))) {
      const statusCode = 404;
      const message = 'Запрашиваемый/е пользователь/ли не найден/ны';
      console.log(statusCode);
      return { statusCode, message };
    }
    if ((this.err.name === 'MongooseError') && (this.err.message.includes('cards'))) {
      const statusCode = 404;
      const message = 'Запрашиваемая/е карточка/ки не найдена/ны';
      console.log(statusCode);
      return { statusCode, message };
    }
    if (this.err.code === 11000) {
      const statusCode = 409;
      const message = 'Пользователь с таким email уже существует';
      console.log(statusCode);
      return { statusCode, message };
    }
    const statusCode = 500;
    const message = 'На сервере произошла ошибка';
    console.log(statusCode);
    return { statusCode, message };
  }
}

module.exports = serverError;

// 401 — передан неверный логин или пароль,
// также эту ошибку возвращает аутентификационный middleware,
// если передан неверный JWT;
// 403 — попытка удалить чужую карточку;
// 409 — при регистрации указан email, который уже существует на сервере.

// Для ошибок созданы классы конструкторы ошибок, наследуемые от Error .
// Не дублируются классы конструкторы ошибок с одинаковым статус-кодом.

// Все ошибки должны проходить через централизованный обработчик,
// отправка ошибок напрямую в контроллере запрещена.

// При обработке ошибок в блоке catch они не выбрасываются через throw,
// а передаются в централизованный обработчик ошибок с помощью next .
