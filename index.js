const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 4000;
const app = express();
// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.up2vp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    await client.connect();
    const phoneCollection = client.db("phonesExpo").collection("phones");
    console.log('connected to db jkfdlasljk');
    try {
        app.get('/phones', async (req, res) => {
            const query = {};
            const cursor = phoneCollection.find(query);
            const results = await cursor.toArray();
            console.log(results);
            res.send(results);
        });

        app.get('/phones/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const phone = await phoneCollection.findOne(query);
            res.send(phone);
        });
        // POST
        app.post('/phones', async (req, res) => {
            const newPhone = req.body;
            const result = await phoneCollection.insertOne(newPhone);
            res.send(result);
        });

        // DELETE
        app.delete('/phones/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await phoneCollection.deleteOne(query);
            res.send(result);
        });


    } finally {




    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send(' i am assigmnet-11')
});
app.listen(port, () => {
    console.log('db connected')
})