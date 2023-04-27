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
  // проверка наличия карточки
  card.findById(req.params.cardId)
    .then((cardData) => {
      if (cardData) {
        // карточку может удалить только владелец
        card.findByIdAndRemove(req.params.cardId, { ownerId: req.user_id })
          //   проверить вид ошибки при попытке удаления не владельцем,
          //   может ввести валидацию, тогда она эту ошибку будет выдавать ? //
          .then(() => res.send({ message: 'Пост удален' }))
          .catch(next);
        return;
      }
      res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
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
    .then((cardData) => (cardData ? res.send(cardData)
      : res.status(404).send({ message: 'Запрашиваемая карточка не найдена' })))
    .catch(next);
};

// удалить like
const deleteLike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // текущий пользователь может удалить лайк
    // если он в массиве есть
    { new: true },
  )
    .then((cardData) => (cardData ? res.send(cardData)
      : res.status(404).send({ message: 'Запрашиваемая карточка не найдена' })))
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, putLike, deleteLike,
};
