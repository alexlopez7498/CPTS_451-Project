const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./db_connection")
const port = 5000;
const routes = require('./API/routes');
require("dotenv").config();


// Middlewares setup
app.use(cors()); 
app.use(express.json()); 
app.use(`/api`, routes);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

sequelize.sync({ alter: true }).then(async () => {
    console.log('Sequelize sync completed...');
    
    // Fix auto-increment counter
    const [result] = await sequelize.query(`
        SELECT setval(
            pg_get_serial_sequence('athlete', 'id'), 
            (SELECT MAX(id) FROM athlete) + 1
        );
    `);
    console.log('Auto-increment counter reset to MAX(id) + 1');
});

testConnection();

app.listen(port, () =>{
    console.log(`server has started on port ${port}`);
});
