const { connect, connection } = require('mongoose');

connection('mongodb://127.0.0.1:27017/thoughtAndReactions');

module.exports = connection; 