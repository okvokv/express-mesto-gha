// функция определения вида ошибки
function determineError(err) {
  console.log(`Ошибка выполнения запроса: ${err.name}, ${err.message}`);
  if (err.name === 'ValidationError') {
    const ERROR_CODE = 400;
    const ERROR_MESSAGE = 'Ошибка валидации. Переданы некорректные данные';
    console.log(ERROR_CODE);
    return { ERROR_CODE, ERROR_MESSAGE };
  }
  if ((err.name === 'MongooseError') && (err.message.includes('timed out'))) {
    const ERROR_CODE = 400;
    const ERROR_MESSAGE = 'Ошибка базы данных.';
    console.log(ERROR_CODE);
    return { ERROR_CODE, ERROR_MESSAGE };
  }
  if (err.name === 'CastError') {
    const ERROR_CODE = 400;
    const ERROR_MESSAGE = 'Неправильный id';
    console.log(ERROR_CODE);
    return { ERROR_CODE, ERROR_MESSAGE };
  }
  if ((err.name === 'MongooseError') && (err.message.includes('users'))) {
    const ERROR_CODE = 404;
    const ERROR_MESSAGE = 'Пользователь/ли не найден/ны';
    console.log(ERROR_CODE);
    return { ERROR_CODE, ERROR_MESSAGE };
  }
  if ((err.name === 'MongooseError') && (err.message.includes('cards'))) {
    const ERROR_CODE = 404;
    const ERROR_MESSAGE = 'Карточка/ки не найдена/ны';
    console.log(ERROR_CODE);
    return { ERROR_CODE, ERROR_MESSAGE };
  }
  const ERROR_CODE = 500;
  const ERROR_MESSAGE = 'Ошибка  на сервере';
  console.log(ERROR_CODE);
  return { ERROR_CODE, ERROR_MESSAGE };
}

module.exports = determineError;
