
const router = require('express').Router();
const fs = require('fs');
const path = require("path");

let db = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../db/db.json')));

//Assign unique IDs to the notes
let maxId = 0;
function updateMaxId(){
    for(const item of db ){
        maxId = Math.max(item.id,maxId);
    }
}

router.get('/notes', (req, res) => {
    res.json(db);
})

//Allow user to delete notes
router.delete('/notes/:id', (req, res) => {
    
    const idToDelete = req.params.id;
    
    const newDb = [];
    for(let i = 0; i < db.length;i++){     
        if(db[i].id != idToDelete){
            newDb.push(db[i]) ;
        }
    }
    db = newDb;
    saveDBFile();
    res.status(200).send('');
})

//user saves notes
router.post('/notes', (req, res) => {

    const newNote = req.body;
    newNote.id = randomID();

    db.push(newNote);

    saveDBFile();

    //http  201 = created
    res.status(201).json(newNote);
})

function saveDBFile(){
    fs.writeFile(path.resolve(__dirname,'../../db/db.json'),JSON.stringify(db), err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      });    
}

//updates id so each one is unique
function randomID(){
    return ++maxId;
}

updateMaxId();
module.exports = router;