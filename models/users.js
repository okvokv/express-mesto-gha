const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      validate: {
        validator(name) { return name.length >= 2 && name.length <= 30; },
      },
      message: 'Ошибка валидации name',
    },
    about: {
      type: String,
      required: true,
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
      required: true,
      validate: {
        validator() {
          return /^(https?:\/\/)(www\.)?[a-z0-9\-.]{2,}\.[a-z]{2,}(\/.*)?$/.test();
        },
        message: 'Ошибка валидации ссылки',
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
