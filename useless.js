import express,{json} from 'express';
import  {MongoClient}  from 'mongodb';
const uri = "mongodb+srv://billylin1954:Cracknut4@cluster0.rrsqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
const app = express();
//const { readFile } = promises;

// Serve static files from the "public" directory

// Middleware to parse JSON data sent from the frontend
app.use(json());
// Route to receive data from the frontend

  async function run() {
   try {
     await client.connect();
     console.log("Connected successfully to MongoDB");
  
     const database = client.db('billCo');
     const collection = database.collection('stuff');
  
     
   let result= await collection.find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
    // console.log(result);
    
    
    await collection.deleteMany({user:""}, function(err, obj) {
      
      console.log(obj.result.n + " document(s) deleted");
      
    });
   } catch (error) {
     console.error("Error:", error);
   } finally {
     await client.close();
     console.log("Connection closed.");
   }
  }
  
  
  run()
 
 
