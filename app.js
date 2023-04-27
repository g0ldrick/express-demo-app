const express = require('express');
const app = express();
const Joi = require('joi');
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
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res
      .status(404)
      .send(`ERROR 404: NO EXISTING COURSE WITH ID OF ${req.params.id}`);
  }
  res.send(course);
});

// Handling post requests with express, and input validation with Joi:
app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// Handling put requests with express - updating our course catalogue:
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send(`Course with id ${req.params.id} not found!`);
  }
  // Obj destructing to get error attribute from return value of validateCourse()
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(result.error.details[0].message);
  }
  course.name = req.body.name;
  res.send(course);
});

// Handling delete requests:
app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res
      .status(404)
      .send(`Course with id ${req.params.id} does not exist!`);
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}
