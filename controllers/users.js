const user = require('../models/users');
const determineError = require('../errors');

// получить всех пользователей
const getUsers = (req, res) => {
  user.find()
    .then((users) => res.send(users))
    .catch((err) => {
      const { ERROR_CODE, ERROR_MESSAGE } = determineError(err);
      res.status(ERROR_CODE).send({ message: ERROR_MESSAGE });
    });
};

// получить данные любого пользователя по id
const getUser = (req, res) => {
  user.findById(req.params.userId)
    .then((userData) => (userData ? res.send(userData)
      : res.status(404).send({ message: 'Пользователь не найден' })))
    .catch((err) => {
      const { ERROR_CODE, ERROR_MESSAGE } = determineError(err);
      res.status(ERROR_CODE).send({ message: ERROR_MESSAGE });
    });
};
// получить данные текущего пользователя
// const getOwner = (req, res) => {
//   user.findById(req.user._id)
//    .then((userData) => res.send(userData))
//    .catch((err) => {
//      const { ERROR_CODE, ERROR_MESSAGE } = determineError(err);
//      res.status(ERROR_CODE).send({ message: ERROR_MESSAGE });
//    });
// };
// ---------------------------------------------------------------------------
// создать пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((userData) => res.status(201).send(userData))
    .catch((err) => {
      const { ERROR_CODE, ERROR_MESSAGE } = determineError(err);
      res.status(ERROR_CODE).send({ message: ERROR_MESSAGE });
    });
};
//------------------------------------------------------------------------------
// изменить данные текущего пользователя
const updateUser = (req, res) => {
  const { name, about } = req.body;
  user.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true },
  )
    .then((userData) => (userData ? res.send(userData)
      : res.status(404).send({ message: 'Пользователь не найден' })))
    .catch((err) => {
      const { ERROR_CODE, ERROR_MESSAGE } = determineError(err);
      res.status(ERROR_CODE).send({ message: ERROR_MESSAGE });
    });
};

// изменить аватар текущего пользователя
const updateAvatar = (req, res) => {
  user.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true },
  )
    .then((userData) => res.send(userData))
    .catch((err) => {
      const { ERROR_CODE, ERROR_MESSAGE } = determineError(err);
      res.status(ERROR_CODE).send({ message: ERROR_MESSAGE });
    });
};
// --------------------------------------------------------------------------
module.exports = {
  getUsers, getUser, createUser, updateUser, updateAvatar,
};
