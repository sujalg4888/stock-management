import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    let body = await request.json();
    const uri : string = "mongodb+srv://sujalgupta246890:0AHLmqk0C01Ib0Xy@stockmangementsystemclu.apz97rh.mongodb.net/?retryWrites=true&w=majority&appName=stockmangementsystemcluster";
    const client = new MongoClient(uri);
    try{
        const database = client.db('stock');
        const inventory = database.collection('inventory');
        const product = await inventory.insertOne(body);
        return NextResponse.json({product, ok:true})
    }finally{
        await client.close();
    }
};

export async function GET(request: Request) {
    const uri : string = "mongodb+srv://sujalgupta246890:0AHLmqk0C01Ib0Xy@stockmangementsystemclu.apz97rh.mongodb.net/?retryWrites=true&w=majority&appName=stockmangementsystemcluster";
    const client = new MongoClient(uri);
    try{
        const database = client.db('stock')
        const collection = database.collection('inventory');
        const products = await collection.find({}).toArray();
        return NextResponse.json({ products, success:true });
    }finally{
        await client.close();
    }
}