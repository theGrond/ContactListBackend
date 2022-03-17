'use strict'

var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/"
var jwt = require('jsonwebtoken')

exports.authentication = function (req, res) {
    // Capture the input fields
    let username = req.body.username;
    let password = req.body.password;

    // console.log(username+' '+password)
    // Ensure the input fields exists and are not empty
    if (username && password) {

        MongoClient.connect(url, function (err, db) {
            if (err) throw err
            var dbo = db.db("ContactList")
            var query = {
                username: username,
                password: password
            }
            dbo.collection("Users").find(query).toArray(function (err, result) {

                // If there is an issue with the query, output the error
                if (err) throw error;
                // If the account exists
                if (result.length > 0) {
                    console.log('logged in')
                    const token = jwt.sign({ username: result.username, password: result }, 'secret_keys')
                    console.log(token)
                    res.json({
                        message: 'Authenticated! Use this token in the header',
                        token: token
                    })
                } else {
                    console.log('false useraneme or password')
                    res.json({
                        message: 'Invalid Username or Password',
                        user: req.body
                      })
                }
                res.end();
            })
        })
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
}
