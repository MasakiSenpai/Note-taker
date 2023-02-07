const express = require('express');
const fs = require('fs');
const path = require('path');
const {v4:uuid} = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001;
const db = path.join(__dirname, 'db', 'db.json')
let notes = JSON.parse(fs.readFileSync(db, {encoding: 'utf-8'}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    // console.log(req.body)
    let newNote = req.body;
    newNote.id = uuid();
    notes.push(newNote);
    fs.writeFileSync(db, JSON.stringify(notes, null, 2));
    res.json(notes);
})

app.delete('/api/notes/:id', (req, res) => {
    console.log(req.params.id);
    notes = notes.filter(n => {
        return n.id != req.params.id
    })
    fs.writeFileSync(db, JSON.stringify(notes, null, 2));
    res.json(notes);
}) 

app.listen(PORT, () => {
    console.log('Running on 3001');
})