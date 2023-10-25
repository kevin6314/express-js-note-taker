const notes = require('express').Router();
const {readFromFile, readAndAppend, readAndDeleteByNoteId} = require('../helpers/fsUtils');
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

notes.delete('/:noteId', (req, res) => {
    const noteId = req.params.noteId;

    if (noteId) {
        readAndDeleteByNoteId(noteId, './db/db.json');
        res.json({status: 'success', message: `note ${noteId} deleted`})
    } else {
        res.status(400).json({status: 'error', message: `Invalid noteId`})
    }
})

module.exports = notes;