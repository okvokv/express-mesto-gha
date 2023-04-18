const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// подключение базы данных
mongoose.connect('mongodb://localhost:27017/mestodb');
// назначение порта сервера
const { PORT = 3000 } = process.env;

// подключение серверного модуля для интерпретации файла
const app = express();

// сборка объекта из JSON-формата
app.use(express.json());

// мидлваре добавления к каждому запросу объекта req.user со значением _id пользователя
app.use((req, res, next) => {
  console.log(req.params, req.body);
  req.user = { _id: '643d9e02682fc5675c4ffb67' }; // _id тестового пользователя
  next();
});

// подключение роутеров
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', ((req, res) => res.status(404).send('Запрошен несуществующий маршрут')));

// включение прослушивания  порта
app.listen(PORT, () => {
  console.log(`App server listening at: http://localhost:${PORT}`);
});
