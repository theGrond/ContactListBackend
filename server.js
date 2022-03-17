var express = require('express')
app = express()

const bodyParser = require('body-parser')
const cors = require('cors')

port = process.env.PORT || 5001
// User = require('./api/models/userModel')

const { appendFile } = require('fs')
app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var routes = require('./api/routes/contactRoutes')
routes(app)

app.listen(port)
console.log('ContactList started on : ' + port)