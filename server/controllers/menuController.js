import {connectionToDB} from '../services/utiles'
import {Menu} from '../models/menu'

const createMenu = async (req, res) => {
    await connectionToDB();
    let menu;

    try {
        let newMenu = new Menu(req.body)
        console.log('reut'+newMenu)
        const savedMenu = await newMenu.save();
        res.status(201).send(savedMenu);

    }
    catch (err) {
        res.status(500).send(err);
    }
    return res.status(500).send()
}

const getMenus = async (req, res) => {
    await connectionToDB();

    try {
        let menus = await Menu.find({})
        res.status(200).send(menus);
    }
    catch (err) {
        res.status(500).send(err);
    }
    return res.status(500).send("Unexpected error")
}

const getMenuByDate = async (req, res) => {
    await connectionToDB();
    try {
        let menus = await Menu.find({date: req.body.date})
        return res.status(200).send(menus);
    }
    catch (err) {
        return res.status(500).send(err);
    }
    return res.status(500).send("Unexpected error")
}

export{createMenu,getMenus, getMenuByDate}