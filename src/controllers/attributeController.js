import {
  attribute,
  attribute_value,
  product_attribute
} from '../models';

/**
 * Controller function for attribute
 */
class AttributeController {

  /**
   * @static
   * @param {object} req
   * @return {json} res
   * @description get all attributes list.
   */
  static getAttributes(req, res) {
    attribute.findAll()
      .then((Attributes) => {
        return res.status(200).json({
          Attributes
        });
      })
      .catch(error => res.status(400).json({
        "error": {
          "status": 400,
          "code": "ATR_03",
          "message": "Attributes not found.",
          "field": "Attributes"
        }
      }))
  }

  /**
   * @static
   * @param {object} req
   * @return {json} res
   * @description get attributes by id.
   */
  static getOneAttribute(req, res) {
    const { attribute_id } = req.params;

    if (!(Number.isInteger(Number(attribute_id)))) {
      return res.status(400).json({
        "error": {
          "status": 400,
          "code": "ATR_01",
          "message": "The ID is not a number.",
          "field": "attribute_id"
        }
      })
    }

    return attribute.findOne({
      where: { attribute_id }
    })
      .then((Attribute) => {
        res.status(200).json({
          Attribute,
        });
      })
      .catch(error => res.status(400).json({
        "error": {
          "status": 400,
          "code": "ATR_02",
          "message": "Something went wrong.",
          "field": "attribute_id"
        }
      }))
  }

  /**
   * @static
   * @param {object} req
   * @return {json} res
   * @description get values of attribute by value.
   */
  static getValueOfAttribute(req, res) {
    const { attribute_id } = req.params;

    if (!(Number.isInteger(Number(attribute_id)))) {
      return res.status(400).json({
        "error": {
          "status": 400,
          "code": "ATR_01",
          "message": "The ID is not a number.",
          "field": "attribute_id"
        }
      })
    }

    return attribute_value.findAll({
      where: { attribute_id },
      attributes: ['attribute_value_id', 'value']
    })
      .then((values) => {
        res.status(200).json({
          values
        });
      })
      .catch(error => res.status(400).json({
        "error": {
          "status": 400,
          "code": "ATR_02",
          "message": "Something went wrong.",
          "field": "attribute_id"
        }
      }))
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description get attribute value of products.
   */
  static getProductAttribute(req, res) {
    const { product_id } = req.params;

    if (!(Number.isInteger(Number(product_id)))) {
      return res.status(400).json({
        "error": {
          "status": 400,
          "code": "PRO_01",
          "message": "The ID is not a number.",
          "field": "product_id"
        }
      })
    }

    product_attribute.findAll({
      where: { product_id }
    })
    .then((foundProducts) => {
      if (foundProducts) {
        res.status(200).json({
          foundProducts
        })
        // return attribute_value.findAll({
        //   where: { attribute_value_id }
        // })
        // .then((productAttribute) => {
        //   res.status(200).json({
        //     productAttribute
        //   });
      }})
        .catch(error => res.status(400).json({
          "error": {
            "status": 400,
            "code": "ATR_02",
            "message": "Something went wrong.",
            "field": "product_id"
          }
        }))
      // }
    // })
  }
}

export default AttributeController;
