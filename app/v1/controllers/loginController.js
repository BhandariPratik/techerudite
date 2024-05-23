import loginService from '../services/loginService.js';
import {success,Error} from '../../../utils/response.js';

class LoginController {

  async register(req, res) {
    try {
      let data = await loginService.register(req.body);
      console.log('dataaaaaa',data)
      success(res,'USER_REGISTRATION_SUCCESS', data,200);
    } catch (error) {
      Error(req, res, error,500);
    }
  }

  async login(req, res) {
    try {
      let data = await loginService.login(req.body);
      success(res, 'LOGIN_SUCCESS', data, 200);
    } catch (error) {
       Error(req, res, error,500);
    }
  }

}

export default new LoginController();
