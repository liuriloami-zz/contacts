var express = require('express');
var router = express.Router();

var wrap = require('co-express');
var async = require('async');

var mongoose = require('mongoose');
var Contact = mongoose.model('Contact');
var Category = mongoose.model('Category');

//Allowing Cross origin access
router.all('/*', wrap(function*(request, response, next) {
    response.header('Access-Control-Allow-Origin', request.headers.origin);
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'X-Requested-With');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    response.header('Access-Control-Allow-Credentials', 'true');
    next();
}));

router.get('/', wrap(function*(request, response, next) {
    var contacts = yield Contact.find({}).exec();
    var categories = yield Category.find({}).exec();
    response.send({
        contacts: contacts,
        categories: categories
    });
}));

router.post('/contact', wrap(function*(request, response, next) {
    var form = request.body.form;
    var contact = null;

    if (form._id)
        contact = yield Contact.find({ _id: form._id }).exec();

    if (contact == null)
        contact = new Contact();

    contact.name = form.name;
    contact.email = form.email;
    contact.categories = form.categories;
    contact.markModified('categories');
    yield contact.save();

    var contacts = yield Contact.find({}).exec();
    response.send({
        contacts: contacts
    });
}));

router.delete('/contact', wrap(function*(request, response, next) {
    var _id = request.body._id;

    var removedContact = yield Contact.find({ _id: _id }).exec();
    if (removedContact != null)
        yield removedContact.remove().exec();

    var contacts = yield Contact.find({}).exec();

    response.send({
        contacts: contacts
    });
}));

router.post('/category', wrap(function*(request, response, next) {
    var form = request.body.form;
    var category = null;

    if (form._id)
        category = yield Category.find({ _id: form._id }).exec();

    if (category == null)
        category = new Category();

    category.name = category.name;
    yield category.save();

    var contacts = yield Contacts.find({}).exec();
    var categories = yield Category.find({}).exec();
    response.send({
        contacts: contacts,
        categories: categories
    });
}));

router.delete('/category', wrap(function*(request, response, next) {
    var _id = request.body._id;

    var removedCategory = yield Category.find({ _id: _id }).exec();
    if (removedCategory != null) {
        var contacts = yield Contact.find({ categories: removedCategory._id }).exec();
        for (var i = 0; i < contacts.length; i++) {
            contacts[i].categories = contacts[i].categories.filter(function(category) {
                return category._id != removedCategory._id;
            });
        }
        yield removedCategory.remove().exec();
    }

    var contacts = yield Contact.find({}).exec();
    var categories = yield Category.find({}).exec();

    response.send({
        contacts: contacts,
        categories: categories;
    });
}));

module.exports = router;
