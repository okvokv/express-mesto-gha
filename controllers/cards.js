const card = require('../models/cards');
const determineError = require('../errors');

// получить все карточки
const getCards = (req, res) => {
  card.find()
    .then((cards) => res.send(cards))
    .catch((err) => {
      const { ERROR_CODE, ERROR_MESSAGE } = determineError(err);
      res.status(ERROR_CODE).send(ERROR_MESSAGE);
    });
};
// --------------------------------------------------------------------------------
// создать карточку
const createCard = (req, res) => {
  const ownerId = req.user._id; // временно
  const { name, link } = req.body;
  card.create({ name, link, ownerId })
    .then((cardData) => res.status(201).send(cardData))
    .catch((err) => {
      const { ERROR_CODE, ERROR_MESSAGE } = determineError(err);
      res.status(ERROR_CODE).send(ERROR_MESSAGE);
    });
};
// ----------------------------------------------------------------------------------
// удалить карточку
const deleteCard = (req, res) => {
  card.deleteMany(req.params.cardId)
    .then(() => res.send({ message: 'Пост удален' }))
    .catch((err) => {
      const { ERROR_CODE, ERROR_MESSAGE } = determineError(err);
      res.status(ERROR_CODE).send(ERROR_MESSAGE);
    });
};

// поставить like
const putLike = (req, res) => {
  const ownerId = req.user._id; // временно
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: ownerId } }, // добавить like текущего пользователя
    // в массив, если такого там нет
    { new: true },
  )
    .then((cardData) => res.send(cardData))
    .catch((err) => {
      const { ERROR_CODE, ERROR_MESSAGE } = determineError(err);
      res.status(ERROR_CODE).send(ERROR_MESSAGE);
    });
};

// удалить like
const deleteLike = (req, res) => {
  const ownerId = req.user._id; // временно
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: ownerId } }, // убрать like текущего пользователя из массива
    { new: true },
  )
    .then((cardData) => res.send(cardData))
    .catch((err) => {
      const { ERROR_CODE, ERROR_MESSAGE } = determineError(err);
      res.status(ERROR_CODE).send(ERROR_MESSAGE);
    });
};

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};
