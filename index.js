const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc');
const express = require("express"),

routes = require("./routes/routes"),
  cors = require("cors");
  const mongoose = require("mongoose");
  mongoose.connect('mongodb+srv://admin:passwordbaru123@shop-restful-api-howto.mongodb.net/sample_aia').then(() => console.log('it works'))
  
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "Sample Project AIA"
      },
      servers: [
        {
          url: "http//localhost:8000"
        }
      ],
    },
    apis: ['./routes/*.js']
  }
  const specs = swaggerJsDoc(options)
  app = express() 
  app.use(express.json());
  app.use(cors());
  // app.use()
  app.use(routes);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs) )
app.listen(8000, () => console.log("server is running at port"));
