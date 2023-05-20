const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

 

const app = express()
const port = process.env.PORT ||5000;
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ejfmzqt.mongodb.net/?retryWrites=true&w=majority`;

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
    // Send a ping to confirm a successful connection
    const toycollection = client.db('toyDB').collection('alltoys')
// get data
    app.get('/alltoys',async(req,res)=>{
          const result = await toycollection.find().toArray()
          res.send(result)
     })
     app.get('/alltoys/:email',async(req,res)=>{
          // console.log(req.params.email);
          const e = req.params.email
          // console.log(e);
          const result = await toycollection.find({email:e}).toArray()
          res.send(result)
     })
     // post data
app.post('/alltoys',async(req,res)=>{
     const add = req.body;
     // console.log(add);
     const result = await toycollection.insertOne(add)
     res.send(result)
})
app.get('/toys/:id',async(req,res)=>{
     const id = req.params.id;
     const query = {_id : new ObjectId(id)};
     const result = await toycollection.findOne(query);
     res.send(result)

})
app.get('/toys/:id',async(req,res)=>{
          const id = req.params.id;
          const query = {_id : new ObjectId(id)};
          const result = await toycollection.findOne(query);
          res.send(result)
     })
          app.patch('/toys/:id',async(req,res)=>{
               const id = req.params.id;
               const user = req.body;
               const filter = {_id : new ObjectId(id)}
               
               const options ={upsert:true}
               const update = {
                    $set:{
                         toyName :user.name,
                         price:user.price,
                         quantity:user.quantity,


                    }
               }
               const result = await toycollection.updateOne(filter,update,options)
               res.send(result)
          })

          app.delete('/de/:id', async(req,res)=>{
               const id = req.params.id;
               console.log(id);
                  const query = {_id: new ObjectId(id)}
                  const result = await toycollection.deleteOne(query);
                  res.send(result)
               console.log(result);
          })
      

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


 
 