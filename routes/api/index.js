const router = require('express').Router();
const fs = require('fs');
const db = require('../../db/db.json')

router.get('/notes', (req, res) => {
    res.json(db);
})

//post request goes here to send the notes to db.json

//it will come in as request.body



module.exports = router;