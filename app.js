const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const NotFoundError = require('./middlewares/NotFoundError');
const InternalServerError = require('./middlewares/InternalServerError');
const config = require('./config');
const auth = require('./middlewares/auth');
const adminsRouter = require('./routes/admins');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// назначение порта сервера
const { PORT } = config;

// подключение базы данных
mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// подключение серверного модуля для интерпретации файла
const app = express();

// сборка приходящих cookies
app.use(cookieParser());
// сборка объекта из JSON-формата
app.use(express.json());

// подключение роутеров
app.use('/', adminsRouter);
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use('*', auth, ((req, res, next) => next(new NotFoundError('root'))));

// обработчик ошибок celebrate
app.use(errors());

// обработчик остальных ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log('app:', statusCode, message);
  res.status(statusCode).send({
    message: statusCode === 500
      ? new InternalServerError() : message,
  });
  next();
});

// включение прослушивания  порта
app.listen(PORT, () => {
  console.log(`App server listening at: http://localhost:${PORT}`);
});
