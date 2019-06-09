import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Token helper utility class
 *
 * @export
 * @class TokenHelper
 */
export default class TokenHelper {
  /**
   * Generates jwt token
   *
   * @static
   * @param {object} customer
   * @returns {string} jwt token
   * @memberof Token
   */
  static generateToken(customer) {
    const { customer_id, email } = customer;
    const token = jwt.sign({
      customer_id, email
    }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    const tokenString = `Bearer ${token}`
    return tokenString + ' expires_in' + ':' + ' 24h';
  }

  /**
   * Decodes jwt token
   *
   * @static
   * @param {string} token
   * @returns {number | false} decoded user id or false if invalid
   * @memberof Token
   */
  static decodeToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        const error = new Error(err);
        error.status = 401;
        return error;
      }
      return decoded;
    });
  }
}
