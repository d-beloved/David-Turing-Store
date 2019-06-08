import { customer, sequelize } from '../models';
import bcrypt from 'bcrypt';
import trimInput from '../utils/trimInput';
import TokenHelper from '../utils/tokenHelper';


/**
 * Customer functions
 */
class CustomerController {
  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description register a new customer
   */
  static registerCustomer(req, res, next) {
    const newCustomer = {
      name: trimInput(req.body.name),
      email: trimInput(req.body.email),
      password: bcrypt.hashSync(trimInput(req.body.password), 10),
      address_1: null,
      address_2: null,
      city: null,
      region: null,
      postal_code: null,
      credit_card: null,
      day_phone: null,
      eve_phone: null,
      mob_phone: null
    };

    customer
      .findOne({
        where: (sequelize.fn("lower", sequelize.col("email")),
        sequelize.fn("lower", newCustomer.email)),
      })
      .then(customerEmail => {
        if (customerEmail === null) {
          customer
            .create(newCustomer)
            .then(createdCustomer => {
              const { dataValues } = createdCustomer;
              const { password, ...rest } = dataValues;
              const accessToken = TokenHelper.generateToken(createdCustomer);
              res.status(200).json({
                customer: rest,
                accessToken
              });
            })
            .catch(error =>
              res.status(400).json({
                error: {
                  status: 400,
                  code: "USR_04",
                  message: "The email already exists.",
                  field: "email"
                }
              })
            );
        }
      })
      .catch(error =>
        res.status(500).json({
          error: {
            status: 500,
            code: "USR_00",
            message: "Something went wrong",
            field: "customer"
          }
        })
      );
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description log a customer in
   */
  static customerLogin(req, res, next) {
    const { email, password } = req.body;

    customer
      .findOne({
        where: { email },
      })
      .then(Customer => {
        if (!Customer) {
          return res.status(400).json({
            error: {
              status: 400,
              code: "USR_05",
              message: "The email doesn't exist.",
              field: "email"
            }
          })
        }
        bcrypt.compare(password.toLowerCase(), Customer.password)
          .then(isMatch => {
            if (isMatch) {
              const { dataValues } = Customer;
              const { password, ...rest } = dataValues;
              const accessToken = TokenHelper.generateToken(Customer);
              return res.status(200).json({
                customer: rest,
                accessToken
              });
            }
            return res.status(400).json({
              error: {
                status: 400,
                code: "USR_01",
                message: "Email or Password is invalid.",
                field: "login"
              }
            });
          })
          .catch(error =>
            res.status(500).json({
              error: {
                status: 500,
                code: "USR_00",
                message: "Something went wrong",
                field: "customer"
              }
            })
          );
      })
      .catch(next);
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description Update customer information
   */
  static updateCustomerInfo(req, res, next) {
    const customer_id = req.customerId;
    const {
      name,
      email,
      password,
      day_phone,
      eve_phone,
      mob_phone
    } = req.body;

    customer
      .findByPk(customer_id)
      .then(foundCustomer => {
        return foundCustomer
          .update({
            name: trimInput(name) || foundCustomer.name,
            password: bcrypt.hashSync(trimInput(password), 10) || foundCustomer.password,
            email: trimInput(email) || foundCustomer.email,
            address_1: foundCustomer.address_1,
            address_2: foundCustomer.address_2,
            city: foundCustomer.city,
            region: foundCustomer.region,
            postal_code: foundCustomer.postal_code,
            country: foundCustomer.country,
            credit_card: foundCustomer.credit_card,
            shipping_region_id: foundCustomer.shipping_region_id,
            day_phone: trimInput(day_phone) || foundCustomer.day_phone,
            eve_phone: trimInput(eve_phone) || foundCustomer.eve_phone,
            mob_phone: trimInput(mob_phone) || foundCustomer.mob_phone,
          })
          .then(updatedCustomer => {
            const { dataValues } = updatedCustomer;
            const { password, ...rest } = dataValues;
            return res.status(200).json(
              rest
            );
          })
          .catch(error =>
            res.status(500).json({
              error: {
                status: 500,
                code: "USR_00",
                message: "Something went wrong",
                field: "UpdateCustomer"
              }
            })
          );
      })
      .catch(next);
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description Get a customer
   */
  static getACustomer(req, res, next) {
    const customer_id = req.customerId;

    customer
      .findByPk(customer_id)
      .then(foundCustomer => {
        const { dataValues } = foundCustomer;
        const { password, ...rest } = dataValues;
        return res.status(200).json(
          rest
        );
      })
      .catch(next);
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description Update a customer address
   */
  static updateCustomerAddress(req, res, next) {
    const customer_id = req.customerId;
    const {
      address_1,
      address_2,
      city,
      region,
      postal_code,
      country,
      shipping_region_id
    } = req.body;

    customer
      .findByPk(customer_id)
      .then(foundCustomer => {
        return foundCustomer
          .update({
            name: foundCustomer.name,
            email: foundCustomer.email,
            address_1: trimInput(address_1) || foundCustomer.address_1,
            address_2: trimInput(address_2) || foundCustomer.address_2,
            city: trimInput(city) || foundCustomer.city,
            region: trimInput(region) || foundCustomer.region,
            postal_code: trimInput(postal_code) || foundCustomer.postal_code,
            country: trimInput(country) || foundCustomer.country,
            credit_card: foundCustomer.credit_card,
            shipping_region_id: trimInput(shipping_region_id) || foundCustomer.shipping_region_id,
            day_phone: foundCustomer.day_phone,
            eve_phone: foundCustomer.eve_phone,
            mob_phone: foundCustomer.mob_phone,
          })
          .then(updatedCustomer => {
            const { dataValues } = foundCustomer;
            const { password, ...rest } = dataValues;
            return res.status(200).json(
              rest
            );
          })
          .catch(error =>
            res.status(500).json({
              error: {
                status: 500,
                code: "USR_00",
                message: "Something went wrong",
                field: "UpdateCustomer"
              }
            })
          );
      })
      .catch(next);
  }
}

export default CustomerController;
