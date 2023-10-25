const notes = require('express').Router();
const {readFromFile, readAndAppend} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

//GET route to retrieve all the notes
notes.get('/', (req, res) => 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

//POST route for a new UX/UI tip
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            noteId: uuid(),
        };
    
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
        
    } else {
        res.json('Error in posting feedback');
    }
});

notes.delete('/', (req, res) => {
    
})

module.exports = notes;