const express = require('express');
const app = express()

app.use(express.json());

const courses =[
{id:1, name: 'course1'},
{id:2, name: 'course2'},
{id:3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.send('Hello world!!!');
});

app.get('/api/courses', (req, res)=> {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    if(!req.body.name ||req.body.name.length < 3){
        //400 bad request
        res.status(400).send('Name is required and should be minimum of 3 charaters');
        return;
    }
    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})



// api/courses/1
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id ===parseInt(req.params.id))
    if (!course)res.status(404).send('Course witht he given id was not found');
    res.send(course);
});





//PORT
const port = process.env.PORT  || 3000;
app.listen (port, ()=>console.log(`Listening on Port ${port}`))