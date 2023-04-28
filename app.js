const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
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
    password: Joi.string().required().regex(/^([^а-яА-Я]){8,30}$/),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^\s*https?:\/\/\S+\s*$/),
  }),
}), createUser);

// защита аутентификацией всех роутеров ниже
app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// обработчик ошибок маршрутизации
app.use('*', ((res) => res.status(404).send({ message: 'Запрошен несуществующий маршрут' })));

// обработчик ошибок celebrate
app.use(errors());

// обработчик остальных ошибок
app.use((err, res, next) => {
  const { statusCode = 500 } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : err.message });
  next();
});

// включение прослушивания  порта
app.listen(PORT, () => {
  console.log(`App server listening at: http://localhost:${PORT}`);
});
