const express = require("express");
require('dotenv').config();
const product = require('./routes/products.js');
const mongoose = require('./config/database.js');


const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/products', product);
app.use('/', product);
app.use('/api/products/:id',product)

// Start server
const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
