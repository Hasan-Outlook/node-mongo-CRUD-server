const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Server is runing on ${port}`);
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pi1lej5.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;
console.log(uri);
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
    // const userCollection = client.db('nodeMongoCRUD').collection('users');
    const database = client.db("nodeMongoCRUD");
    const userCollection =  database.collection("users");

    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('New User', user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.listen(port,()=>{
  console.log('Server is running on port: ' + port);
});