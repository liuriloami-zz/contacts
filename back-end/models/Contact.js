var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    tel: String,
    categories: [ Number ]
});

ContactSchema.plugin(autoIncrement.plugin, { model: 'Contact', startAt: 1 });
mongoose.model('Contact', ContactSchema);
