const express = require('express');

//import modular routers for /notes
const notesRouter = require('./notes');

const app = express();

//localhost:3001/api/notes
app.use('/notes', notesRouter);

module.exports = app;