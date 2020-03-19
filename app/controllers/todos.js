/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const Todos = mongoose.model('Todos');

const getAll = async (req, res) => {
  const todos = await Todos.find();
  res.json(todos);
};

const create = async (req, res) => {
  Todos.create(req.body)
    .then(() => res.json({ message: 'Todos add' }))
    .catch((err) => res.json({ message: err }));
};

const checked = async (req, res) => {
  const todo = await Todos.findOne({ title: req.body.title });
  if (todo.checked) {
    await Todos.findOneAndUpdate({ title: req.body.title }, { checked: false })
      .then(() => {
        res.json({ message: 'Todos update!' });
      });
  } else {
    await Todos.findOneAndUpdate({ title: req.body.title }, { checked: true })
      .then(() => {
        res.json({ message: 'Todos update!' });
      });
  }
};

const remove = async (req, res) => {
  Todos.deleteOne({ title: req.body.title })
    .then(() => res.json({ message: 'Todos delete' }));
};

module.exports = {
  getAll,
  create,
  checked,
  remove,
};
