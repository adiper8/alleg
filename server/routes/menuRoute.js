import {createMenu,getMenus,getMenuByDate} from '../controllers/menuController'


const menuRoute = (app) =>{
    app.route('/menus')
        .post(createMenu);
    app.route('/menus')
        .get(getMenus);
    app.route('/menus/menus-by-date')
        .get(getMenuByDate);

};

export default menuRoute