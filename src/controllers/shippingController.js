import { sequelize } from '../models';

/**
 * Shipping functions
 */
class ShippingController {

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description Get the shipping regions
   */
  static getShippingRegions(req, res, next) {
    sequelize.query('call customer_get_shipping_regions()')
    .then(result => {
      return res.status(200).json(
        result
      );
    })
    .catch(next);
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description Get info about regions shipping
   */
  static getShippingInfo(req, res, next) {
    const { shipping_region_id } = req.params;

    sequelize.query('CALL orders_get_shipping_info(:inShippingRegionId)',
      {
        replacements: { inShippingRegionId: shipping_region_id },
      }
    )
    .then(result => {
      return res.status(200).json(
        result
      )
    }).catch(next);
  }
}

export default ShippingController;
