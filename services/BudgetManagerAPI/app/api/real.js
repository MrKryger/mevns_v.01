const mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      config = require('@config');

const api = {};

//static
const message1 = [ 21, 8, 6, 21, 16, 13, 25, 25, 10, 5, 15];
const message2 = [ 30, 30, 30, 30, 30, 30, 30];
const message3 = [40, 20, 80, 10];
const message4 = [40, 20, 80, 10];

api.ping = (User) => (req, res) => {
  //получаем id пользователя и от него можно запросить данные из бд
  console.log(req.query.user_id)
    res.json({message1: message1, message2: message2, message3: message3, message4: message4});
};



api.verify = (headers) => {
  if (headers && headers.authorization) {
    const split = headers.authorization.split(' ');

    if (split.length === 2) return split[1];
    else return null;
  } else return null;
}

module.exports = api;
