const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const fileUpload = require('express-fileupload');

const scan = require('./routes/scan');

// Defining the app
const app = express()

// Defining the port
const port = process.env.PORT || 9100

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json({ limit: '10mb', extended: true }));

// app.use(fileUpload());

app.use('/scan', scan);

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
