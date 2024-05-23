


import { custom } from '../../../config/connection.js';
import moment from 'moment';
import cryptoJS from 'crypto-js';

class LoginService {
  login(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let {
          email,
          password,
          user_type
        } = body

        let userDetail = await custom(`select * from registration where email= '${email.toLowerCase()}'`);

        console.log(userDetail)

        if (!userDetail.length) {
          return resolve( {
            message: 'USER_NOT_FOUND',
            statusCode: 200
          });
        }

        else if (userDetail[0].user_type != user_type) {
          return resolve( {
            message: 'You are not allowed to Login from here',
            statusCode: 200
          });
        }
        let password_hash = cryptoJS.SHA256(password).toString();

        if (userDetail[0].password != password_hash)
          return resolve ({
            message: 'INVALID_USER_PASSWORD',
            statusCode: 200,
          });

        return resolve({
          userDetail
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  register(body) {
    console.log('in service')
    return new Promise(async (resolve, reject) => {
      try {
        let {
          first_name,
          last_name,
          email,
          password,
          user_type
        } = body
        let date = moment().format('YYYY-MM-DD HH:mm:ss')
        // let userDetail = await module.exports.checkExistingInfo(body);

        let userqery = await custom(`select * from registration where email ='${email}'`);
        console.log(userqery)
        if (userqery.length > 0)
          return resolve({
            message: 'EMAIL_ALREADY_EXISTS',
            statusCode: 200
          })
        else {
          let password_hash = cryptoJS.SHA256(password).toString();

          const user = await custom(`INSERT INTO registration (first_name, last_name, email, user_type, password,created_on)  
            VALUES ('${first_name}', '${last_name}', '${email}', '${user_type}', '${password_hash}','${date}');
`)
          return resolve({
            user
          });
        }

      } catch (error) {
        return reject(error);
      }
    });
  }

}

export default new LoginService();