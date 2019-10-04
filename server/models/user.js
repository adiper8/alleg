import { Menu } from './menu';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: {
        type: String,
    },
    id: {
        type: String,
    },
    dates:{
       type: [String]
    }
},{ collection: 'Users' })

module.exports = mongoose.model('User', User);