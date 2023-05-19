const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT ||5000;
app.use(cors())
app.use(express.json())
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ejfmzqt.mongodb.net/?retryWrites=true&w=majority`;

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const toycollection = client.db('toyDB').collection('alltoys')

//     get toy
app.get('/alltoys',async(req,res)=>{
     const result = await toycollection.find().toArray()
     res.send(result)
})
     app.get('/alltoys/:email',async(req,res)=>{
          console.log(req.params.email);
          const e = req.params.email
          // console.log(e);
          const result = await toycollection.find({email:e}).toArray()
          res.send(result)
     })
      
      



     // post data
     app.post('/alltoys',async(req,res)=>{
          const add = req.body;
          console.log(add);
          const result = await toycollection.insertOne(add)
          res.send(result)
     })
     app.get('/toys/:id',async(req,res)=>{
          const id = req.params.id;
          const query = {_id : new ObjectId(id)};
          const result = await toycollection.findOne(query);
          res.send(result)

     })
      



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
//     await client.close();
  }
}
run().catch(console.dir);






app.get('/',(req,res)=>{
     res.send("ToY server is running")
})
app.listen(port,()=>{
     console.log(`toy server port is :${port}`);
})