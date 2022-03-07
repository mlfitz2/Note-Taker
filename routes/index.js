//Import dependency for express
const path = require('path');
const router = require('express').Router();
const api = require('./api');

router.use('/api', api);

//define pathway for /notes page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

//define pathway for all others - ie the homepage
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})


module.exports = router;