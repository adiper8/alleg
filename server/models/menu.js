import mongoose from 'mongoose';

const menus = new mongoose.Schema({
    dateValue: {
        type: String,
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