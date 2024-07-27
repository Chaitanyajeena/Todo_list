const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/todoDB');

const todoSchema = new mongoose.Schema({
  task: String
});

const Todo = mongoose.model('Todo', todoSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const todos = await Todo.find({});
  res.render('index', { todos: todos });
});

app.post('/addtask', async (req, res) => {
  const newTask = new Todo({
    task: req.body.task
  });
  await newTask.save();
  res.redirect('/');
});

app.post('/deletetask', async (req, res) => {
  const taskId = req.body.taskId;
  await Todo.findByIdAndDelete(taskId);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
