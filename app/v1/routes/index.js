
import loginController from '../controllers/loginController.js';

const routerConfig = (app) => {
    app.post('/api/v1/register', [ loginController.register]);
    app.post('/api/v1/login', [ loginController.login]);
};

export default routerConfig;