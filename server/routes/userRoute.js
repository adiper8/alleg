import {createUser, deleteUser,getUsers} from '../controllers/userController'

const routes = (app) =>{
    app.route('users/createuser')
        .post(createUser)

    app.route('users/deleteuser')
        .delete(deleteUser)

    app.route('/users')
        .get(getUsers)
};


export default routes;