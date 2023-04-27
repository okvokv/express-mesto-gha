const { errors, celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();
const {
  getUsers, getUser, getCurrentUser, updateUser, updateAvatar,
} = require('../controllers/users');

// обработка запроса получения пользователей
usersRouter.get('', getUsers);

// обработка запроса получения данных пользователя по id
usersRouter.get('/:userId', getUser);

// обработка запроса получения данных текущего пользователя
usersRouter.get('/me', celebrate({
  cookies: Joi.object().keys({
    // Authorization: `Bearer ${_token}` // ---а любого другого можно без авторизации ? //
  }),
}), getCurrentUser);

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
    avatar: Joi.string().required().regex(/^(https?:\/\/)(www\.)?[a-z0-9\-.]{2,}\.[a-z]{2,}(\/.*#)?$/),
  }),
}), updateAvatar);

// обработчик ошибок celebrate
usersRouter.use(errors());

module.exports = usersRouter;
