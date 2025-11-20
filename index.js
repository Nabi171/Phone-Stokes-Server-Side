const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 4000;
const app = express();
// middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://faisalnabiul8_db_user:OyKc8w7CGebD33SE@cluster0.udsk1x4.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  await client.connect();
  const courseCollection = client.db("Elearning").collection("courses3");
  console.log("connected to db jkfdlasljk");
  try {
    app.get("/courses", async (req, res) => {
      const query = {};
      const cursor = courseCollection.find(query);
      const results = await cursor.toArray();
      console.log(results);
      res.send(results);
    });

    app.get("/phones/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const phone = await phoneCollection.findOne(query);
      res.send(phone);
    });

    // AUTH
    app.post("/login", async (req, res) => {
      const user = req.body;
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.send({ accessToken });
    });

    // POST
    app.post("/phones", async (req, res) => {
      const newPhone = req.body;
      const result = await phoneCollection.insertOne(newPhone);
      res.send(result);
    });

    // DELETE
    app.delete("/phones/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await phoneCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("surver is running");
});
app.listen(port, () => {
  console.log("db connected");
});
