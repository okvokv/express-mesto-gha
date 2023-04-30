const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../models/users');

// получить всех пользователей
const getUsers = (req, res, next) => {
  user.find()
    .then((users) => res.send(users))
    .catch(next);
};

// получить данные любого пользователя по id
const getUser = (req, res, next) => {
  user.findById(req.params.userId)
    .then((userData) => {
      if (userData) {
        res.send(userData);
        return;
      }
      next({ message: 'Запрашиваемая карточка не найдена' });
    })
    .catch(next);
};
// получить данные текущего пользователя
const getCurrentUser = (req, res, next) => {
  user.findById(req.user._id)
    .then((userData) => {
      if (userData) {
        res.send(userData);
        return;
      }
      next({ message: 'Запрашиваемая карточка не найдена' });
    })
    .catch(next);
};

// ---------------------------------------------------------------------------
// создание жетона с зашифрованным _id пользователя на 7 дней
function createToken(userData) {
  return jwt.sign(
    { _id: userData._id },
    'super-strong-secret',
    { expiresIn: '7d' },
  );
}

// авторизовать пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;
  user.findOne({ email }).select('+password')
    .then((userData) => {
      bcrypt.compare(password, userData.password)
        .then((matched) => {
          if (matched) {
            const token = createToken(userData);
            // выдача жетона пользователю
            // res.cookie('jwt', token, {
            // maxAge: 3600000 * 24 * 7, // 7 дней
            // httpOnly: true,
            // sameSite: true,
            // });
            res.send({ token });
            res.send({ message: 'Авторизация успешна.' });
            // если у ответа нет тела, можно использовать метод end
            return;
          }
          next('Неправильные почта или пароль');
        })
        .catch(next);
    })
    .catch(next);
};

// создать пользователя
const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  // хеширование пароля
  bcrypt.hash(password, 10)
    .then((hpassword) => user.create({
      email, password: hpassword, name, about, avatar,
    }))
    .then((userData) => res.status(201).send({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      _id: userData._id,
      email: userData.email,
    }))
    .catch(next);
};
//------------------------------------------------------------------------------
// изменить данные текущего пользователя
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  user.findOneAndUpdate(
    { _id: req.user._id }, // изменить данные может только владелец
    { name, about },
    { new: true },
  )
    .then((userData) => res.send(userData))
    .catch(next);
};

// изменить аватар текущего пользователя
const updateAvatar = (req, res, next) => {
  user.findOneAndUpdate(
    { _id: req.user._id }, // изменить аватар может только владелец
    { avatar: req.body.avatar },
    { new: true },
  )
    .then((userData) => res.send(userData))
    .catch(next);
};
// --------------------------------------------------------------------------
module.exports = {
  getUsers, getUser, getCurrentUser, createUser, login, updateUser, updateAvatar,
};
