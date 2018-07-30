var createError = require('http-errors');
const { User } = require('./mysequelize')
var models = require('./models');
const express = require('express')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
const app = express()
var cors = require('cors');

app.use(bodyParser.json())

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectsRouter = require('./routes/projects');
var empRouter = require('./routes/employees');
var taskRouter = require('./routes/tasks');


// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/employees', empRouter);
app.use('/tasks', taskRouter);












app.post('/api/employee', (req, res) => {
    console.log(req.body);
    models.Employees.create(req.body)
        .then(user => res.json(user))
})


app.post('/api/myuser', (req, res) => {
    models.Newchk.create(req.body)
        .then(user => res.json(user))
})

app.get('/api/employee', (req, res) => {
    models.Employees.findAll().then(users => res.json(users))

})


app.get('/api/employee/:id', (req, res) => {
    var id = req.body.id;
    models.Employees.findOne({ where: { id: req.params.id } }).then(users => res.json(users.firstName + ' ' + users.lastName))

})

// API ENDPOINTS
// create a user
app.post('/api/users', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
})
// get all users
app.get('/api/users', (req, res) => {
    User.findAll().then(users => res.json(users))

})


    ;

// get specific user
app.get('/api/users/:id', (req, res) => {
    var id = req.body.id;
    User.findOne({ where: { id: req.params.id } }).then(users => res.json(users))

})


const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})

