var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var CategorySchema = new mongoose.Schema({
    name: String
});

CategorySchema.plugin(autoIncrement.plugin, { model: 'Category', startAt: 1 });
mongoose.model('Category', CategorySchema);
