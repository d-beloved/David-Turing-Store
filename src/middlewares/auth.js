import TokenHelper from '../utils/tokenHelper';

/**
 * @class auth
 */
export default class auth {
  /**
   * authenticate a user using provided token
   * Sets userId, userRole, userName as properties on req object
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {next} next middleware
   * @memberof auth
   */
  static authenticateUser(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(400).json({
        "error": {
          "status": 400,
          "code": "AUT_01",
          "message": "Authorization code is empty.",
          "field": "NoAuth"
        }
      })
    }
    if (authorization.split(' ')[0] !== 'Bearer') {
      // invalid auth format
      return res.status(401).json({
        "error": {
          "status": 401,
          "code": "AUT_02",
          "message": "Access Unauthorized.",
          "field": "NoAuth"
        }
      })
    }
    const token = authorization.split(' ')[1];
    const decoded = TokenHelper.decodeToken(token);
    if (typeof decoded.customer_id === 'undefined') {
      return res.status(401).json({
        "error": {
          "status": 401,
          "code": "AUT_02",
          "message": "Access Unauthorized.",
          "field": "NoAuth"
        }
      })
    }
    // set user ID in request object for next middlewares use
    // extract payload from decoded jwt
    const { customer_id } = decoded;
    req.customerId = customer_id;
    // user authorised to access resource
    return next();
  }
}
