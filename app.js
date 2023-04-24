const express = require('express');
const app = express();
// Using express.json()
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// Would get this info from database in practise
let courses = [
  { id: 1, name: 'JavaScript Course' },
  { id: 2, name: 'Python Course' },
  { id: 3, name: 'React Course' },
];

// Handling get requests with express:
app.get('/', (req, res) => {
  res.send('testing');
});
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  if (!req.body.name || req.body.name < 3)
    res
      .status(400)
      .send(
        'Bad request! Name is required and length should be greater than 3 characters.'
      );
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res
      .status(404)
      .send(`ERROR 404: NO EXISTING COURSE WITH ID OF ${req.params.id}`);
  res.send(course);
});

// Handling post requests with express:
app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
