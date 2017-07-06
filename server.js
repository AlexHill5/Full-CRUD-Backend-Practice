const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive')
const connectionString = "postgres://qcghxvwhbcghyo:a062c76eab6ef5dcacf76a6372b8932b98bac143e6ef137f63382bc3ca40f725@ec2-23-21-169-238.compute-1.amazonaws.com:5432/db37u8b05qtams?ssl=true";
const products_controller = require('./products_controller')
// create express app
const app = module.exports = express();

// middleware
app.use( bodyParser.json() )
app.use( cors() )

// db
massive( connectionString ).then( dbInstance => {
    dbInstance.set_schema()
    .then( console.log("Table reset!"));
} );

app.post( '/api/product', products_controller.create );
app.get( '/api/products', products_controller.getAll );
app.get( '/api/product/:id', products_controller.getOne );
app.put( '/api/product/:id', products_controller.update );
app.delete( '/api/product/:id', products_controller.delete );


const port = 4000
app.listen(port, () => {
    console.log("It's Lit Fam")
})