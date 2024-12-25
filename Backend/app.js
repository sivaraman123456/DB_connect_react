import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';
import  path  from 'path';
const app = express();
const __dirname = path.resolve();


app.use(express.static('images'));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});
app.get("/",async(req,res)=>{
  res.status(200).json({success:'hello worl'})
})

console.log("dir:",__dirname);




app.get('/places', async (req, res) => {
  try {
      // Use __dirname to get the absolute path to the current file
      console.log(__dirname);
      
      const filePath = path.join(__dirname, 'data', 'places.json'); 
      const fileContent = await fs.readFile(filePath, 'utf8');
      const placesData = JSON.parse(fileContent);

      res.status(200).json({ places: placesData });
  } catch (err) {
      console.error('Error reading file:', err.message);
      res.status(500).json({ error: 'Could not retrieve places data' });
  }
});


app.get('/user-places', async (req, res) => {
  const filePath=path.join(__dirname,'data','user-places.json')
  const fileContent = await fs.readFile(filePath);

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put('/user-places', async (req, res) => {
  const places = req.body.places;
const filePath=path.join(__dirname,'data','user-places.json')
  await fs.writeFile(filePath, JSON.stringify(places));

  res.status(200).json({ message: 'User places updated!' });
});

// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000,()=>{
    console.log("server running 3000");
    
});
