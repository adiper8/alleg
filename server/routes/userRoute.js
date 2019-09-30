import {createUser, deleteUser,getUsers} from '../controllers/userController'

const routes = (app) =>{
    app.route('users/create-user')
        .post(createUser)

    app.route('users/delete-user/:id')
        .delete(deleteUser)

    app.route('/users')
        .get(getUsers)
};


export default routes;