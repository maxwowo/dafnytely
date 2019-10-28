const express = require('express');
const Query=require("../controller/Query");

const query = express.Router();
query.post("/",(req,res)=>{
    if(typeof Query[req.body.method] === "function"){
        //valid method
        Query[req.body.method](req.body).then(results=>{
            res.send(results)
        })

    }else{
        res.status(404).send("Invalid method");
    }
});

module.exports = query;


