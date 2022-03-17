'use strict'

var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/"
var jwt = require('jsonwebtoken')

exports.getContacts = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
        var dbo = db.db("ContactList")
        dbo.collection("Contacts").find({}).toArray(function (err, result) {
            if (err) throw err
            console.log(result)
            res.json(result)
            db.close()
        })
    })
}

exports.getContactByID = function (req, res) {

    console.log(req.params.id)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
        var dbo = db.db("ContactList")
        dbo.collection("Contacts").find({ contactid: parseInt(req.params.id) }).toArray(function (err, result) {
            if (err) throw err
            console.log(result)
            res.json(result)
            db.close()
        })
    })
}

exports.addContact = function (req, res) {
    var contact = req.body
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
        var dbo = db.db("ContactList")
        dbo.collection("Contacts").find({ contactid: parseInt(contact.contactid) }).toArray(function (err, result) {
            if (err) throw err
            if (result.length == 0) {
                dbo.collection("Contacts").insertOne(contact, function (err, result) {
                    if (err) throw err
                    console.log("Inserted 1 item")
                    console.log(contact)
                    res.json(result)
                    db.close()
                })
            } else {
                res.json(400, {
                    error: 1,
                    msg: "ID already exists"
                });
                db.close()
            }
        })
    })

}

exports.updateContactByID = function (req, res) {
    var contact = req.body
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
        var dbo = db.db("ContactList")
        dbo.collection("Contacts").updateOne({ contactid: parseInt(req.params.id) }, { $set: contact }, { upsert: true }, function (err, result) {
            if (err) throw err
            console.log("Update 1 item")
            console.log(contact)
            res.json(result)
            db.close()
        })
    })
}

exports.deleteContactByID = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
        var dbo = db.db("ContactList")
        dbo.collection("Contacts").deleteOne({ contactid: parseInt(req.params.id) }, function (err, result) {
            if (err) throw err
            console.log("Element " + req.params.id + " is deleted")
            res.json(result)
            db.close()
        })
    })

}

