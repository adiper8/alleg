import mongoose from 'mongoose';
import {connectToDB} from '../services/utillitiesService'
require('../models/user')

let User = mongoose.model('User')

async function createUser(user){
    console.log("strat createUser")

    connectToDB('allegronetDB');

    var newUser={}
    newUser.name = user.name;
    newUser.id = user.id

    let con = new User(newUser);
    con.save();
}

async function deleteUser(user){
    console.log("strat deleteUser")

    connectToDB('allegronetDB');
    let reut = await User.remove({
        id:user.id})
}

const getUsers = async (req, res) => {
    connectToDB('allegronetDB');

    try {
        let users = await User.find({})
        res.status(200).send(users);
    }
    catch (err) {
        if (err.status && err.status >= 400 && err.status < 500) {
            res.status(err.status).send(err.message);
        }
    }
}

export {createUser, deleteUser}