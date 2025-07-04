const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDb Codes


const uri = process.env.MongodbURI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const groupsCollection = client.db('groupsdb').collection('allgroups');
    const usersCollection = client.db('groupsdb').collection('users');

    app.get('/users', async(req, res) => {
        const result = await usersCollection.find().toArray();
        res.send(result);
    })
    app.get('/groups', async(req, res) => {
        const result = await groupsCollection.find().toArray();
        res.send(result);
    })
    app.get('/groups/:id', async(req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await groupsCollection.findOne(query);
        res.send(result);
    })
    app.get('/mygroups/:email', async(req, res) => {
        const userEemailFromParams = req.params.email;
        const query = { userEmail: userEemailFromParams };

        const result = await groupsCollection.find(query).toArray();
        
        res.send(result);
    })

    app.post('/groups', async(req, res)=>{
        const newGroup = req.body;
        console.log(newGroup);
        const result = await groupsCollection.insertOne(newGroup);
        console.log('result', result);
        res.send(result);
    })
    app.put('/groups/:id', async(req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const options = { upsert: true};
        const updatedData = req.body;
        const updateDoc = {
            $set: updatedData
        }
        const result = await groupsCollection.updateOne(query, updateDoc, options);
        res.send(result);
    })
    app.delete('/groups/:id', async(req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await groupsCollection.deleteOne(query);
        res.send(result);
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('HobbyHub server is ready');
});

app.listen(port, () => {
    console.log(`HobbyHub server is running on port ${port}`);
});



