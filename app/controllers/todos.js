const mongoose = require('mongoose');

const Todos = mongoose.model('Todos');

const getAll = async (req, res) => {
  const todos = await Todos.find();
  res.json(todos);
};

const create = async (req, res) => {
  Todos.create(req.body)
    .then(() => res.json({ message: 'Todos add' }));
};

const remove = async (req, res) => {
  Todos.deleteOne({ title: req.body.title })
    .then(() => res.json({ message: 'Todos delete' }));
};

module.exports = {
  getAll,
  create,
  remove,
};
