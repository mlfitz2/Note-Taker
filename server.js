//import dependency for express
const express = require('express');
const routes = require('./routes');


//Define port
const PORT = process.env.PORT || 3001;

//Initialize express
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//tell express that we're using the routes folder
app.use(routes);


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})