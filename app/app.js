
const express = require('express');
const app = express();

app.use(express.json());

/*
https://www.youtube.com/watch?v=pKd0Rpw7O48

app.get()
app.post()
app.put()
app.delete()
*/

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
];

app.get('/', (req, res)=>{
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c =>c.id = parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found')
    res.send(course);
});

// app.get('/api/courses/:year/:month', (req, res) => {
//     res.send(req.params);
// });

//http://localhost:3000/api/courses/2018/1?Sortby=name
// app.get('/api/courses/:year/:month', (req, res) => {
//     res.send(req.query);
// });

app.post('/api/courses', (req, res) => {
    console.log(req);
    console.log(req.body);
    console.log(req.body.name);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`Listening on port ${port}...`));