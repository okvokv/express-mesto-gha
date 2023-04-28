const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator(email) { return validator.isEmail(email); },
      },
      message: 'Ошибка валидации email',
    },
    password: {
      select: false,
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
      validate: {
        validator(name) { return name.length >= 2 && name.length <= 30; },
      },
      message: 'Ошибка валидации name',
    },
    about: {
      type: String,
      default: 'Исследователь океана',
      minlength: 2,
      maxlength: 30,
      validate: {
        validator(about) { return about.length >= 2 && about.length <= 30; },
      },
      message: 'Ошибка валидации about',
    },
    avatar: {
      type: String,
      // type: mongoose.SchemaTypes.Url,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(avatar) {
          return /^\s*https?:\/\/\S+\s*$/.test(avatar);
        },
        message: 'Ошибка валидации ссылки',
      },
    },
  },
);

// добавление собственного метода обработки
userSchema.statics.findByCredentials = function add(email, password, res, next) {
  return this.find({ email }).select('+password') // вернуть ответ из базы с паролем
    .then((userData) => bcrypt.compare(password, userData.password))
    .then((matched) => {
      console.log(matched); // --- //
      if (matched) {
        res.send({ message: 'Аутентификация успешна' });
        return; // или return userData
      }
      Promise.reject(new Error('Неправильные почта или пароль')); // нужен ли return ?//
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);
