require('module-alias/register');
const http = require('http'),
  BudgetManagerAPI = require('@BudgetManagerAPI'),
  BudgetManagerServer = http.Server(BudgetManagerAPI),
  BudgetManagerPORT = process.env.PORT || 3000,
  LOCAL = '0.0.0.0',
  app = require('express')(),
  io = require('socket.io')(BudgetManagerServer);

setInterval(func, 5000);
const count = [0,10,20,30,40,50,60];
const arr = [0];
function func() {
  if (arr.length > 7) {
    arr.shift();
    arr.push(Math.floor(Math.random() * 50));

    var shifted = count.shift();
    count.push(shifted);
  } else {
      arr.push(Math.floor(Math.random() * 50));
  }
  var result = {
    "counts": count,
    "message": arr
  };

  io.emit('message', result);
  console.log(result)
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function (socket) {
  socket.on('message', function (msg) {
    io.emit('message', msg);
  });
});

BudgetManagerServer.listen(BudgetManagerPORT, LOCAL, () => console.log(`BudgetManagerAPI running on ${BudgetManagerPORT}`));
