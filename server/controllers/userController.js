import mongoose from 'mongoose';
import {connectToDB} from '../services/utillitiesService'
require('../models/user')

let User = mongoose.model('User')

const createUser = async (req, res) => {
    console.log("strat createUser")

    connectToDB('allegronetDB');

    var newUser={}
    newUser.name = req.body.name;
    newUser.id = req.body.id

    let con = new User(newUser);
    con.save();
}

const deleteUser = async (req, res) =>{
    connectToDB('allegronetDB');
    try{
        let response = await User.deleteOne({id: req.params.id})
        return res.status(200).send(response)
    }
    catch(err){
        console.log(err)
        throw err;
    }
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


const addDateToUser = async (req, res) => {
    connectToDB('allegronetDB');
    try {
        let user = await User.findOne({id:req.body.id})
        user.dates.push(req.body.date)
        user.save()
        res.status(200).send(user);
    }
    catch (err) {
        if (err.status && err.status >= 400 && err.status < 500) {
            res.status(err.status).send(err.message);
        }
    }
}

const getUsersByDate = async (req, res) => {
    connectToDB('allegronetDB');
    try {
        let users = await User.find({dates:req.query.date})
        var usersName = users.map( function(user) {
            return user.name;
        });
        res.status(200).send(usersName);
    }
    catch (err) {
        if (err.status && err.status >= 400 && err.status < 500) {
            res.status(err.status).send(err.message);
        }
    }
}




export {createUser, deleteUser,getUsers,addDateToUser,getUsersByDate}