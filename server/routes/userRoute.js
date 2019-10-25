import {createUser, deleteUser,getUsers,addDateToUser,getUsersByDate} from '../controllers/userController'

const routes = (app) =>{
    app.route('/users/create-user')
        .post(createUser)

    app.route('/users/delete-user/:id')
        .delete(deleteUser)

    app.route('/users')
        .get(getUsers)

    app.route('/users/add-date')
        .post(addDateToUser)

    app.route('/users/find-users-by-date')
        .get(getUsersByDate)
};


export default routes;