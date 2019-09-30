import {createUser, deleteUser} from '../controllers/userController'

const routes = (app) =>{
    app.route('/createuser')
    .post(async(req, res) => {
        createUser(req.body)
        res.status(200).send();
    });

    app.route('/deleteuser')
    .post(async(req, res) => {
        deleteUser(req.body)
        res.status(200).send();
    });
};


export default routes;