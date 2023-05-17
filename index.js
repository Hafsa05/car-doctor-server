const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb'); //from mongodb application code
require('dotenv').config(); // from .env document
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());  //req.body diye je data pathabo oita jeno json e convert kora jai


//  mongodb application code 

console.log('User Name:', process.env.DB_USER, '& Password:', process.env.DB_PASS,);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.afx5ss3.mongodb.net/?retryWrites=true&w=majority`;

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
		await client.db("admin").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);




// checking server is running or not & it will show in browser  
app.get('/', (req, res) => {
	res.send(`Car Doctor is running `);
})

// it will show in cmd
app.listen(port, () => {
	console.log(`Car Doctor is running on port ${port}`);
})