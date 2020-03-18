const todos = require('../app/controllers/todos');

module.exports = (app) => {
  app.get('/todos', todos.getAll);
  app.post('/todos', todos.create);
  app.delete('/todos/:title', todos.remove);
};
