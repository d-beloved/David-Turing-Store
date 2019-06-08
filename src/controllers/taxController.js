import { tax } from '../models';

/**
 * Tax functions
 */
class TaxController {

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description Get all taxes
   */
  static getAllTaxes(req, res, next) {
    tax.findAll().then((taxes) => {
      return res.status(200).json(
        taxes
      )
    }).catch(next);
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description Get taxes by Id
   */
  static getOneTax(req, res, next){
    const { tax_id } = req.params;

    tax.findOne({
      where: {
        tax_id
      }
    })
    .then((tax) => {
      return res.status(200).json(
        tax
      )
    }).catch(next);
  }
}

export default TaxController;
