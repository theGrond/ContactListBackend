// only run this script once to init the Database!

var databaseName = 'ContactList'

var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/" + databaseName

MongoClient.connect(url, function (err, db) {
    if (err) throw err
    console.log("Database " + databaseName + " created!");

    var dbo = db.db(databaseName)

    dbo.createCollection("Users", function (err, result) {
        if (err) throw err
        console.log("Collection Users created")
        db.close()
    })

    var obj = [
        {
            username: "max",
            password: "1111"
        },
        {
            username: "bob",
            password: "1234"
        }
    ]

    dbo.collection("Users").insertMany(obj, function (err, result) {
        if (err) throw err
        console.log("Inserted Users")
        db.close()
    })

    dbo.createCollection("Contacts", function (err, result) {
        if (err) throw err
        console.log("Collection Contacts created")
        db.close()
    })

    var obj = [
        {
            contactid: 1,
            fname: "Antonia",
            lname: "Seelmann",
            mnumber: "1234",
            email: "antonia@seelman.de",
            facebook: "antonia",
            image: ""
        },
        {
            contactid: 2,
            fname: "Emma",
            lname: "Baudy",
            mnumber: "1234",
            email: "emma@baudy.de",
            facebook: "emma",
            image: "https://semantic-ui.com/images/avatar2/large/molly.png"
        },
        {
            contactid: 3,
            fname: "Teresa",
            lname: "Reuss",
            mnumber: "1234",
            email: "teres@reuss.de",
            facebook: "teresa",
            image: "https://semantic-ui.com/images/avatar2/large/elyse.png"
        },
        {
            contactid: 4,
            fname: "Max",
            lname: "Gohlke",
            mnumber: "1234",
            email: "max@gohlke.de",
            facebook: "max",
            image: "https://semantic-ui.com/images/avatar/large/elliot.jpg"
        },
        {
            contactid: 5,
            fname: "Bob",
            lname: "Cat",
            mnumber: "1234",
            email: "bob@cat.com",
            facebook: "bob",
            image: "https://semantic-ui.com/images/avatar/large/elliot.jpg"
        },
        {
            contactid: 6,
            fname: "New Bob ",
            lname: "Cat ",
            mnumber: "1234",
            email: "bob@cat.com",
            facebook: "bob",
            image: "https://semantic-ui.com/images/avatar/large/jenny.jpg"
        },
    ]

    dbo.collection("Contacts").insertMany(obj, function (err, result) {
        if (err) throw err
        console.log("Inserted Contacts")
        db.close()
    })

});