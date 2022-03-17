'use strict'

module.exports = function (app) {
    var auth = require('../controllers/authController')

    app.route('/auth')
        .post(auth.authentication)

    var contacts = require('../controllers/contactController')

    app.route('/contacts/getmany')
        .get(contacts.getContacts)

    app.route('/contacts/getone/:id')
        .get(contacts.getContactByID)

    app.route('/contacts/add')
        .post(contacts.addContact)

    app.route('/contacts/update/:id')
        .put(contacts.updateContactByID)

    app.route('/contacts/delete/:id')
        .delete(contacts.deleteContactByID)

}