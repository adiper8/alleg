import {createMenu,getMenus,getMenuByDate} from '../controllers/menuController'


const menuRoute = (app) =>{
    app.route('/menus/create-menu')
        .post(createMenu);
    app.route('/menus')
        .get(getMenus);
    app.route('/menus/menus-by-date')
        .get(getMenuByDate);

};

export default menuRoute