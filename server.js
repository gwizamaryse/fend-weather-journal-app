// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/*Dependencies*/
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
//Spin up server
const server = app.listen(port, listening);
// or const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})
//Callback to debug
function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

// POST route
app.post('/', (req, res) => {
  projectData.date = req.body.date;
  projectData.temperature = req.body.main.temp;
  projectData.feelings = req.body.feelings;
  projectData.name = req.body.name;
  console.log('', projectData.date, '\n', 
  projectData.name, '\n', 
  projectData.feelings,   '\n' ,
  projectData.temperature, '\n',
 );
  res.send();
});

// GET route
app.get('/getRecords', (req, res) => {
    res.send(projectData);
});



