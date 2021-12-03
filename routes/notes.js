const express = require('express')
const notes = require('express').Router()
const fs = require('fs')
const db = './db/db.json'
const { v4: uuidv4 } = require('uuid')
const util = require('util')

const readFromFile = util.promisify(fs.readFile)


// Get for notes
notes.get('/', (req, res) => {
    console.log(`${req.method} received for notes!}`)

    readFromFile('./db/db.json')
        .then((data) => res.json(JSON.parse(data)))
})

// Post request for notes
notes.post('/', (req, res) => {
    console.log(`${req.method} received for notes!}`)

    const { title, text } = req.body

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        fs.readFile(db, 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                const parsedData = JSON.parse(data)
                parsedData.push(newNote)
                res.json(parsedData)
                fs.writeFile(db, JSON.stringify(parsedData, null, 4), (err) =>
                    err ? console.error(err) : console.log(`note written to ${db}`)
                );
            }

        })
    }
})

// Delete note function
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);

            fs.writeFile(db, JSON.stringify(result, null, 4), (err) =>
                err ? console.error(err) : console.log(`Data written to ${db}`)
            )
            res.json(`Item ${noteId} has been deleted`);
        })
})

module.exports = notes