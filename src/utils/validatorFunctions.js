/**
 *
 * @description controller class for customer input validation
 *  @class ValidateCustomerController
 */
class CustomerInputValidation {
  /**
   *  @description method for validation of signup input
   *  @param {object} data body of the request
   *  @returns {object} The body of  the response message
   */
  static checkBodyContains(...params) {
    return (req, res, next) => {
      for (const p of params) {
        if (req.body[p] === undefined || req.body[p] === '') {
          return res.status(400).json({
            "error": {
              "status": 400,
              "code": "USR_02",
              "message": "The field(s) are/is required.",
              "field": `${p}`
            }
          });
        }
      }
      next();
    };
  }

  // static checkLength(...params) {
  //   return (req, res, next) => {
  //     for (const p of params) {
  //       if (req.body[p].length > )
  //     }
  //   }
  // }


  static checkEmail(req, res, next) {
    // checks if the email entered is valid
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) === false) {
      return res.status(400).json({
        "error": {
          "status": 400,
          "code": "USR_03",
          "message": "The email is invalid.",
          "field": "email"
        }
      });
    }
    return next();
  }


}

export default CustomerInputValidation;
