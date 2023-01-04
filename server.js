const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');


const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.json());
app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);


// GET route for notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET information from db
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (error, data) => {
        res.send(data);
    });
});

// POST note to db
app.post('/api/notes', (req,res) => {
    fs.readFile('./db/db.json', (error, data) => {
        const notes = JSON.parse(data);
        notes.push({...req.body, id: uniqid() });
        fs.writeFile('./db/db.json', JSON.stringify(notes), (error, data) => {
            res.send(req.body);
        });
    });
});

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);