// файл конфигурации

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: 'mongodb://0.0.0.0:27017/mestodb',
};

module.exports = config;
