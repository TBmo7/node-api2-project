const express = require('express');
const server = express();
const dbRouter = require("./data/db-router")

 server.use(express.json());
server.use('/api/db', dbRouter);

server.get('/',(req,res)=>{
    res.send(`
    <h2>DB ROUTER API PROJ2</h>
    <p>WELCOME TO THE DATABASE</p>
    `)
})

module.exports = server;