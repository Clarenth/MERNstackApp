const express = require("express");
const EventModel = require('../models/event');
const mongoose = require('mongoose');
const router = express.Router();

router.get('', (req, res, next) =>{
    EventModel.find(function(err, events){
        if(err){
            res.send(err);
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(events, null, 3));
        }
    })
});

router.post('', (req, res, next) =>{
    var event = req.body;
    console.log(event);
})

module.exports = router;