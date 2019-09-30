import mongoose from 'mongoose';

const menus = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    salads:{
        type: String,
    },
    meat:{
        type: String,
    },
    vegetarian:{
        type: String,
    },
    sides:{
        type: String,
    },
    id:{
        type: Number,
        required : true,
        unique: true
    },

})

const Menu = mongoose.model('Menu', menus);

export { Menu};