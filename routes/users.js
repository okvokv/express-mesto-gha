const { errors, celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();
const {
  getUsers, getUser, getCurrentUser, updateUser, updateAvatar,
} = require('../controllers/users');

// обработка запроса получения пользователей
usersRouter.get('', getUsers);

// обработка запроса получения данных пользователя по id
usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);

// обработка запроса получения данных текущего пользователя
usersRouter.get('/me', getCurrentUser);

// обработка запроса изменения данных текущего пользователя
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

// обработка запроса  изменения аватара текущего пользователя
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^https?:\/\/\S+\s*$/),
  }),
}), updateAvatar);

// обработчик ошибок celebrate
usersRouter.use(errors());

module.exports = usersRouter;
