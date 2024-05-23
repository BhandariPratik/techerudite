


export const Error =async (req, res, msg, language, statusCode = 500)=> {
    let response = {
      code: 0,
      status: 'FAIL',
      is_active:0,
    }
    res.status(statusCode).json(response);
  }

  export const success=async(res, msg, data, statusCode = 200)=> {
    try {
      let response = {
        code: 1,
        status: 'SUCCESS',
        message: data.message ?  data.message : msg 
      }

      res.status(statusCode).json(response);
    } catch (error) {
      console.log(`\nsuccess error ->> `, error)
      return;
    }
  }


