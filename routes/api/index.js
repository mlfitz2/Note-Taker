const router = require('express').Router();
const fs = require('fs');
const path = require("path");

let db = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../db/db.json')));


let maxId = 0;

function updateMaxId(){

    for(const item of db ){
        maxId = Math.max(item.id,maxId);
    }

}

router.get('/notes', (req, res) => {
    res.json(db);
})

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

function randomID(){

    return ++maxId;
}

//post request goes here to send the notes to db.json

//it will come in as request.body


updateMaxId();
module.exports = router;