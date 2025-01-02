const {MongoClient} = require( "mongodb");
const uri = "mongodb+srv://billylin1954:Cracknut4@cluster0.rrsqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new  MongoClient(uri);
const express = require("express");
const app = express();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');
app.use(express.static('frontend/build'))
app.use(cors())
const PORT = process.env.PORT || 3001;
app.use(express.json());
// Route to receive data from the frontend
const fileUpload = require("express-fileupload");
// Passing fileUpload as a middleware
app.use(fileUpload());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      // Set the upload folder
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      // Save the file with its original name
      cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Define the upload route
app.post('/api/uploadfile', upload.single('myFile'), (req, res) => {
  try {
      console.log('File received:', req.file);
      res.status(200).json({
          message: 'File uploaded successfully',
          file: req.file,
      });
  } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'File upload failed' });
  }
});

// For handling the upload request
app.get('/api/data', async function (req, res) {
  
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const database = client.db('videos');
    const collection = database.collection('videos');
    
    // Fetch videos data from MongoDB
    const result = await collection.find().limit(200).toArray();
  
    res.send({ response: result } )
  } catch (error) {
    console.error("Error:", error);
    
  } finally {
    await client.close();
    console.log("Connection closed.");
  }
});
app.post("/upload", function (req, res) {
  res.sendFile(__dirname + '/public/upload.html'); 
 
  
  // When a file has been uploaded
  if (req.files && Object.keys(req.files).length !== 0) {
  
    // Uploaded path
    const uploadedFile = req.files.uploadFile;
  
    // Logging uploading file
    console.log(uploadedFile);

    // Upload path
    const uploadPath = __dirname
        +  "/public/uploads/" + uploadedFile.name;
        async function run() {
          const uploadPath = __dirname
        + "/public/uploads/" + uploadedFile.name;
          try {
            await client.connect();
            console.log("Connected successfully to MongoDB");
         
            const database = client.db('videos');
            const collection = database.collection('videos');
           const link = uploadPath.slice(48,uploadPath.length)
            const type="customer";
            // Insert the document into MongoDb
            await collection.insertOne({ type,link,name:req.body.name});
         
          } catch (error) {
            console.error("Error:", error);
          } finally {
            await client.close();
            console.log("Connection closed.");
          }
         }
       
         
         
         run()
    // To save the file using mv() function
    uploadedFile.mv(uploadPath, function (err) {
      if (err) {
        console.log(err);
        res.send("Failed !!");
      } else console.log(":)");
    });
  } else console.log(":(");
});

// To handle the download file request
// GET request to the root of the app
app.get("/", function (req, res) {

  // Sending index.html file as response to the client
  res.sendFile(__dirname + "/upload.html");
});

 
  app.listen(PORT, () => {
    console.log(`Server listening on  ${PORT}`);
  });
  

