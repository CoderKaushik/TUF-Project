const express = require('express');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json()); // Middleware to parse JSON request bodies

// Use the cards routes
app.use('/api/cards', cardsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
