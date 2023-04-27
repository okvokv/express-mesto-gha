const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
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
    link: {
      type: String,
      // type: mongoose.SchemaTypes.Url,
      required: true,
      validate: {
        validator(link) {
          return /^(https?:\/\/)(www\.)?[a-z0-9\-.]{2,}\.[a-z]{2,}(\/.*#)?$/.test(link);
        },
        message: 'Ошибка валидации ссылки',
      },
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = mongoose.model('card', cardSchema);
