const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const NotFoundError = require('./middlewares/NotFoundError');
const { regexforlink, regexforpassword } = require('./utils/regex');
const config = require('./config');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
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
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(regexforpassword),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexforlink),
  }),
}), createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use('*', auth, ((req, res, next) => next(new NotFoundError('Ошибка маршрутизации'))));

// обработчик ошибок celebrate
app.use(errors());

// обработчик остальных ошибок
app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  console.log('app:', statusCode, message);
  res.status(statusCode).send({ message });
  next();
});

// включение прослушивания  порта
app.listen(PORT, () => {
  console.log(`App server listening at: http://localhost:${PORT}`);
});
