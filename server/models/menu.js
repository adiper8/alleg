var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Menu = new Schema({
    date: {
        type: Date,
        required: true,
    },
    salads:{
        type: String,
    },
    meet:{
        type: String,
    },
    vegetarian:{
        type: String,
    },
    sides:{
        type: String,
    }
},{ collection: 'Menus' })

module.exports = mongoose.model('Menu', Menu);