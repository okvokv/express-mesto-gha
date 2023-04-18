const usersRouter = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

// обработка запроса получения пользователей
usersRouter.get('', getUsers);

// обработка запроса получения данных пользователя по id
usersRouter.get('/:userId', getUser);

// обработка запроса получения данных текущего пользователя
// usersRouter.get('/me', getOwner);

// обработка запроса создания пользователя
usersRouter.post('', createUser);

// обработка запроса изменения данных текущего пользователя
usersRouter.patch('/me', updateUser);

// обработка запроса  изменения аватара текущего пользователя
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
