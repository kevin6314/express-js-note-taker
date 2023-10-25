const express = require('express');
const path = require('path');
const api = require('./Develop/routes/index.js');
//const {clog} = require('.middleware/clog'); //tbd if i want this

const PORT = process.env.PORT || 3001; //will want to change this with Heroku

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', api); //sends all requests that begin with API to index.js

app.use(express.static('public')); //serve static assets from public

// GET Route for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public.index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);

