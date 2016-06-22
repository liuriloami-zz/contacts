var express = require('express');
var router = express.Router();

var wrap = require('co-express');

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
        contact = yield Contact.findOne({ _id: form._id }).exec();

    if (contact == null)
        contact = new Contact();

    contact.name = form.name;
    contact.email = form.email;
    contact.tel = form.tel;
console.log(form.categories);
    contact.categories = form.categories;
    contact.markModified('categories');
    yield contact.save();

    var contacts = yield Contact.find({}).exec();
    response.send({
        contacts: contacts
    });
    console.log(contact);
}));

router.delete('/contact/:id', wrap(function*(request, response, next) {
    var _id = request.params.id;

    yield Contact.remove({ _id: _id}).exec();

    var contacts = yield Contact.find({}).exec();

    response.send({
        contacts: contacts
    });
}));

router.post('/category', wrap(function*(request, response, next) {
    var form = request.body.form;
    var category = null;

    if (form._id)
        category = yield Category.findOne({ _id: form._id }).exec();

    if (category == null)
        category = new Category();

    category.name = form.name;
    yield category.save();

    var contacts = yield Contact.find({}).exec();
    var categories = yield Category.find({}).exec();
    response.send({
        contacts: contacts,
        categories: categories
    });
}));

router.delete('/category/:id', wrap(function*(request, response, next) {
    var _id = request.params.id;
    var removedCategory = yield Category.findOne({ _id: _id }).exec();
    if (removedCategory != null) {
        var contacts = yield Contact.find({ categories: removedCategory._id }).exec();
        for (var i = 0; i < contacts.length; i++) {
            contacts[i].categories.remove(removedCategory);
            yield contacts[i].save();
        }
        yield Category.remove({ _id: _id}).exec();
    }

    var contacts = yield Contact.find({}).exec();
    var categories = yield Category.find({}).exec();

    response.send({
        contacts: contacts,
        categories: categories
    });
}));

module.exports = router;
