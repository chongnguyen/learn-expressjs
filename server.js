// const express = require('express');
// const app = express();
const app = require('express')();
const bodyParser = require('body-parser');

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = 8000;

const todos = [
  'Nguyen Duc Trong',
  'Nguyen Quoc Thinh',
  'Nguyen Hoang Anh Duong',
  'Nguyen Thanh Truong'
]

app.get('/', (req, res) => {
  res.render('index', {
    goals: 'Trong se kien tri cho den luc thanh cong'
  });
});
app.get('/user', (req, res) => {
  res.render('users/index', {
    todos
  });
});

app.get('/user/search', (req, res) => {
  let { q } = req.query;
  console.log(q);
  let matchedUser = todos.filter(item => {
    return item.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render('users/index', {
    todos: matchedUser,
    value: q
  });
});

app.get('/user/create', (req, res) => {
  res.render('users/create');
});

app.post('/user/create', (req, res) => {
  let name = req.body.name;
  todos.push(name);
  res.redirect('/user');
})

app.listen(port, () => console.log('Listening on port ' + port));
