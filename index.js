const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const isAuth = require('./middleware/isAuth');
const cors = require('cors');
const createError = require('http-errors');

// env configuration
dotenv.config();

// const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;

// Allow CORS
app.use(cors());

// body parser
app.use(express.json());

// graphql schema and resolver
const grpahQlSchema = require('./graphql/schema/index');
const graphqlResolver = require('./graphql/resolvers/index');


// Auth middleware
app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: grpahQlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

// error handler

app.use((req,res,next) => {
  // const error = new Error('Not found');
  // error.status = 404;
  const error = createError.NotFound();
  next(error);
});

app.use((err,req,res,next) =>{
  res.status(err.status || 500);
  res.send({
    error : {
      status : err.status || 500,
      message : err.message
    }
  })
});


// mongoose connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@rvcluster1.xtazc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(PORT, () => console.log("server is running on the port", PORT));
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
