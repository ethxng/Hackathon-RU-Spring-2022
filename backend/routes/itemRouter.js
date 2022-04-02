var express = require('express');
var router = express.Router();
const {body, validationResult} = require('express-validator');
const fs = require('fs');
const User = require('../models/User.js');
let Item = require('../models/item.js');
let async = require('async');

function createItem(status, item, description, negotiation, price, method_of_delivery, user, cb){
    let data = {
        status: status, 
        item: item, 
        description: description, 
        price: price,
        negotiation: negotiation, 
        method_of_delivery: method_of_delivery, 
        OP: user
    };
    let newItem = new Item(data);
    newItem.save((err) => {
        if (err){
            cb(err, null);
            return;
        } else{
            console.log("New item: " + item);
            cb(null, item);
        }
    })
}

// get all items (non-users can view also)
router.get('/', (req, res, next) => {
    Item.find({}).populate('OP').exec((err, results) => {
        if (err){
            return next(err);
        } else{
            res.send(results);
        }
    });
});

// only run this once
router.get('/load-data', (req, res, next) => {
    let users = [];
    User.find({}).exec((err, results) => {
        if (err)
            return next(err);
        else{
            for (let i = 0; i < results.length; i++){
                users.push(results[i]);
            }
            async.series([
                function(callback){
                    createItem('available', 'sofa', 'brand new sofa. bought 2 weeks ago. need to sell ASAP due to relocation'
                        ,true, '500', 'pickup', users[0], callback);
                },
                function(callback){
                    createItem('available', 'm1 chip macbook air 2021', 'Need money quick', false, '998', 'drop-off', users[1], callback);
                },
                function(callback){
                    createItem('sold', 'PS4', "still works. need to buy because I bought a PS5", true, '300', 'delivery', users[2], callback);
                }
            ]);
            res.send("done");
        }
    });
});

// get a specific item
router.get("/:id", (req, res, next) => {
    Item.findById(req.params.id).populate('OP').exec((err, result) => {
        if (err)
            return next(err);
        else{
            res.status(200).send(result);
        }
    });
});

router.get("/create", (req, res, next) => {
    res.send("you will submit information for a new item here");
});

router.post('/')

module.exports = router;