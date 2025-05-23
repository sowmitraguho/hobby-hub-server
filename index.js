const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('coffee server is ready');
});

app.listen(port, () => {
    console.log(`Coffee server is running on port ${port}`);
});

// serversite github repo: https://github.com/Programming-Hero-Web-Course4/b11a10-server-side-sowmitraguho