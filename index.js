const express = require("express"),
routes = require("./routes"),
  cors = require("cors");
  const mongoose = require("mongoose");
  mongoose.connect('mongodb+srv://admin:passwordbaru123@shop-restful-api-howto.mongodb.net/sample_aia').then(() => console.log('it works'))
  
app = express() 
app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(8000, () => console.log("server is running at port"));
