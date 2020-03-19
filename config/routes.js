const path = require('path');
const todos = require('../app/controllers/todos');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'todolist.html'));
  });
  // api
  app.get('/todos', todos.getAll);
  app.post('/todos', todos.create);
  app.put('/todos', todos.checked);
  app.delete('/todos', todos.remove);
};
