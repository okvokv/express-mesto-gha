const card = require('../models/cards');

// получить все карточки
const getCards = (req, res, next) => {
  card.find()
    .then((cards) => res.send(cards))
    .catch(next);
};
// --------------------------------------------------------------------------------
// создать карточку
const createCard = (req, res, next) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;
  card.create({ name, link, ownerId })
    .then((cardData) => res.status(201).send(cardData))
    .catch(next);
};
// ----------------------------------------------------------------------------------
// удалить карточку
const deleteCard = (req, res, next) => {
  card.findByIdAndRemove(req.params.cardId, { ownerId: req.user._id })
    .then((cardData) => {
      // проверка существования карточки  с данным _id в бд
      if (cardData) {
        // карточку может удалить только владелец
        const ownerId = cardData.ownerId.toString();
        if (ownerId === req.user._id) {
          res.send({ message: 'Пост удален' });
          return;
        }
        next({ message: 'Нет прав на удаление' });
        return;
      }
      next({ message: 'Запрашиваемая карточка не найдена' });
    })
    .catch(next);
};

// поставить like
const putLike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // текущий пользователь может поставить лайк
    // если в массиве его нет
    { new: true },
  )
    .then((cardData) => {
      // проверка существования карточки с данным _id в бд
      if (cardData) {
        res.send(cardData);
        return;
      }
      next({ message: 'Запрашиваемая карточка не найдена' });
    })
    .catch(next);
};

// удалить like
const deleteLike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // текущий пользователь может удалить лайк
    // если в массиве он уже есть
    { new: true },
  )
    .then((cardData) => {
      // проверка существования карточки с данным _id в бд
      if (cardData) {
        res.send(cardData);
        return;
      }
      next({ message: 'Запрашиваемая карточка не найдена' });
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};
