var express = require('express');
var router = express.Router();
const {body, validationResult} = require('express-validator');
const fs = require('fs');
const User = require('../models/User.js');
let Item = require('../models/item.js');
let async = require('async');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');


// for uploading photos
/*
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, '/Users/ethannn_2222/Hackathon-RU-Spring-2022/backend/public/images') // this path is relative to current file's position
    },
    filename: function(req, file, callback){
        let filename = file.originalname.toLowerCase().split(' ').join('_');
        console.log("filename" + filename);
        callback(null, filename);
    }
});

const upload = multer({
    storage: storage, 
    fileFilter: (req, file, callback) => {
        if (file.mimetype === "image/png"){
            callback(null, true);
        }else{
            callback(null, false);
            return callback(new Error("Allowed only .png"));
        }
    }
});*/

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
    jwt.verify(req.token, "HACKRU2022", (err) => {
        if (err)
            return next(err);
        else{
            Item.find({}).populate('OP').exec((err, results) => {
                if (err){
                    return next(err);
                } else{
                    console.log("user's id: " + req.user);
                    res.send(results);
                }
            });
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
                    createItem('sold', 'PS4', "still works. need to sell because I bought a PS5", true, '300', 'delivery', users[2], callback);
                }
            ]);
            res.send("done");
        }
    });
});

// get a specific item
router.get("/:id", (req, res, next) => {
    jwt.verify(req.token, "HACKRU2022", err => {
        if (err)
            return next(err);
        else{
            Item.findById(req.params.id).populate('OP').exec((err, result) => {
                if (err)
                    return next(err);
                else{
                    res.send(result);
                }
            });
        }
    });
});

router.get("/create", (req, res, next) => {
    res.send("you will submit information for a new item here");
});

// posting a new item
// make sure to store the user's id in request headers in the id key
router.post('/create',
    body('description', "description must not be empty").trim().escape(),
    body('item', "Item name must not be empty").trim().escape(),
    (req, res, next) => {
        console.log("token: " + req.token);
        jwt.verify(req.token, "HACKRU2022", err => {
            if (err)
                return next(err);
            else{
                const errors = validationResult(req);
                if (!errors.isEmpty()){ // errors encountered while valiadting data
                    res.status(403).send((errors.array())[0].msg);
                }
                else{
                    let a = (req.body.item).replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                    let b = (req.body.description).replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                    let data = {
                        status: req.body.status, 
                        item: a, 
                        price: req.body.price,
                        description: b, 
                        negotiation: req.body.negotiation,
                        method_of_delivery: req.body.delivery,
                        OP: req.headers['id'],
                    }
                    let newItem = new Item(data);
                    newItem.save((err) => {
                        if (err)
                            return next(err);
                        else{
                            res.send("submit new item successfully");
                        }
                    });
                }
            }
        })
        
    }
);

module.exports = router;