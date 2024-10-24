import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI)
    return console.error("MONGODB_URI is not defined");

  if (isConnected) return console.log("=>using existing database connection");
  const uri =
    "mongodb+srv://prashantmanandhar2002:Eemayas123@cluster0.1owye.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try {
    await mongoose
      .connect(uri)
      .then(() => {
        console.log("MongoDB connected successfully");
        isConnected = true;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
      });
  } catch (error) {
    console.error(error);
  }
};

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
"mongodb+srv://prashantmanandhar2002:Eemayas123@cluster0.1owye.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
