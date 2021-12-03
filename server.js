// Boiler Plate Here
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3001;
const api = require('./routes/index.js')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api)

// Get requests!
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
)


app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html')))

// Invalid requests piece
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);