const express = require('express');
const Expire=require("../controller/Expire");
const router = express.Router();
router.post("/",(req,res)=>{
    if(typeof Expire[req.body.method] === "function"){
        //valid method
        Expire[req.body.method](req.body).then(results=>{
            res.send(results)
        })

    }else{
        res.status(404).send("Invalid method");
    }
});

module.exports = router;


