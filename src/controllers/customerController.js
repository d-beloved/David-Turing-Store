import { customer, shipping_region, shipping } from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import CustomerValidation from '../utils/validator';
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
    const { error, isValid } = CustomerValidation.validateRegistration(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 'error', error });
    }

    const newCustomer = {
      name: req.body.name.toLowerCase(),
      email: req.body.email.toLowerCase(),
      password: req.body.password.toLowerCase()
    };

    customer.findOne({
      where: { email: newCustomer.email }
    })
      .then((customerEmail) => {
        if (!customerEmail) {
          return customer.create(newCustomer)
            .then((createdCustomer) => {
              const { dataValues } = createdCustomer;
              const { password, ...rest } = dataValues;
              const token = TokenHelper.generateToken(createdCustomer);
              return res.status(201).json({
                status: 'success',
                customer: {
                  ...rest,
                  token
                },
                message: 'Registration successful'
              });
            })
            .catch(error => res.status(500).json({
              error,
              message: 'something is wrong'
            }));
        }
        return res.status(400).json({
          status: 'error',
          error: {
            message: 'This email has already been used by another customer'
          }
        });
      })
      .catch(next);
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description log a customer in
   */
  static customerLogin(req, res, next) {
    const { error, isValid } = CustomerValidation.validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 'error', error });
    }

    const { email, password } = req.body;

    customer.findOne({ where: { email } })
    .then((Customer) => {
      if (!Customer) {
        return res.status(404).json({
          status: 'error',
          error: {
            message: 'incorrect email or password'
          }
        });
      }
      bcrypt.compare(password.toLowerCase(), Customer.password).then((isMatch) => {
          if (isMatch) {
            const { dataValues } = Customer;
            const { password, ...rest } = dataValues;
            const token = TokenHelper.generateToken(Customer);
            return res.status(200).json({
              status: "success",
              message: "Login successful",
              user: {
                ...rest,
                token
              }
            });
          }
          return res.status(400).json({
            status: "error",
            error: {
              message: "Incorrect email or password"
            }
          });
      })
      .catch(next);
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
    const { error, isValid } = CustomerValidation.validateProfileInput(req.body);
    const customer_id = req.customerId;
    const {
      name, credit_card, address_1, address_2, city, region, postal_code,
      country, shipping_region_id, day_phone, eve_phone, mob_phone
    } = req.body;

    if (!isValid) {
      return res.status(400).json({ status: 'error', error });
    }

    customer.findByPk(customer_id)
      .then((foundCustomer) => {
        if (!foundCustomer) {
          return res.status(404).json({
            status: 'error',
            error: {
              message: 'customer not found'
            }
          });
        }
        return foundCustomer.update({
          name: trimInput(name) || foundCustomer.name,
          credit_card: trimInput(credit_card) || foundCustomer.credit_card,
          address_1: trimInput(address_1) || foundCustomer.address_1,
          address_2: trimInput(address_2) || foundCustomer.address_2,
          city: trimInput(city) || foundCustomer.city,
          region: trimInput(region) || foundCustomer.region,
          postal_code: trimInput(postal_code) || foundCustomer.postal_code,
          country: trimInput(country) || foundCustomer.country,
          shipping_region_id: trimInput(shipping_region_id) || foundCustomer.shipping_region_id,
          day_phone: trimInput(day_phone) || foundCustomer.day_phone,
          eve_phone: trimInput(eve_phone) || foundCustomer.eve_phone,
          mob_phone: trimInput(mob_phone) || foundCustomer.mob_phone,
        }).then((updatedCustomer) => {
          const { dataValues } = updatedCustomer;
          const { password, ...rest } = dataValues;
          return res.status(200).json({
            status: 'success',
            customer: {
              ...rest
            }
          });
        }).catch(next);
      }).catch(next);
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
      .findByPk(customer_id, {
        include: [
          {
            model: shipping_region,
            attributes: {
              exclude: ["shipping_region_id"]
            },
            include: [
              {
                model: shipping
              }
            ]
          }
        ]
      })
      .then(foundCustomer => {
        if (!foundCustomer) {
          return res.status(404).json({
            status: "error",
            error: {
              message: "customer not found"
            }
          });
        }
        const { dataValues } = foundCustomer;
        const { password, ...rest } = dataValues;
        return res.status(200).json({
          status: "success",
          customer: { ...rest }
        });
      })
      .catch(next);
  }
}

export default CustomerController;
