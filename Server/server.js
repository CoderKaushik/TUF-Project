const express = require('express');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
const corsOptions = {
  origin: [
    'https://tuf-project.vercel.app',
    'https://tuf-project-igx2.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(bodyParser.json()); 

// Use the cards routes
app.use('/api/cards', cardsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
