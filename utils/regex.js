// регулярное выражение для валидации ссылок
const regexforlink = /^\s*(https?:\/\/)\S+\s*$/;
// регулярное выражение для валидации пароля
const regexforpassword = /^[^а-яА-Я\s]{8,30}\s*$/;

module.exports = { regexforlink, regexforpassword };
