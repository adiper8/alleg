import {createUser, deleteUser} from '../controllers/userController'

const routes = (app) =>{
    app.route('users/createuser')
        createUser(req.body)

    app.route('users/deleteuser')
        deleteUser(req.body);


    app.route('/users')
    .get(getUsers);
};


export default routes;