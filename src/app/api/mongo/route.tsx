import { MongoClient , ServerApiVersion} from "mongodb";
import { NextResponse } from "next/server";
// Replace the uri string with your connection string.
// const { MongoClient, ServerApiVersion } = require('mongodb');


export async function GET(request: Request) {
    return  NextResponse.json({ "a": 24 })
}

const uri = "mongodb+srv://sujalgupta246890:0AHLmqk0C01Ib0Xy@stockmangementsystemclu.apz97rh.mongodb.net/?retryWrites=true&w=majority&appName=stockmangementsystemcluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongo() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(error){
    console.log("error connecting to mongo",error);
  }
   finally {
    await client.close();
  }
}
connectToMongo().catch(error => console.log("error connecting to mongo",error));
