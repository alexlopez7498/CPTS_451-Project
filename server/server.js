const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./db_connection")
const port = 5000;
const routes = require('./API/routes');
require("dotenv").config();


// Middlewares setup
app.use(cors()); 

app.use(`/api`, routes);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

sequelize.sync().then(() => {
    console.log('Sequelize sync completed...');
});

testConnection();

app.listen(port, () =>{
    console.log(`server has started on port ${port}`);
});
