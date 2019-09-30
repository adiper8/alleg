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
    }

})

const Menu = mongoose.model('Menu', menus);

export { Menu};