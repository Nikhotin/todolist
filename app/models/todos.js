const mongoose = require('mongoose');

const TodosSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
    default: false,
  },
});

mongoose.model('Todos', TodosSchema);
