const cardsRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

// обработка запроса получения всех карточек
cardsRouter.get('/', getCards);

// обработка запроса создания карточки
cardsRouter.post('/', createCard);

// обработка запроса удаления карточки по id
cardsRouter.delete('/:cardId', deleteCard);

// обработка запроса поставить like
cardsRouter.put('/:cardId/likes', putLike);

// обработка запроса удалить like
cardsRouter.delete('/:cardId/likes', deleteLike);

module.exports = cardsRouter;
