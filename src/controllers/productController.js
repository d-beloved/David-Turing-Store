import { product, product_category, Sequelize, sequelize, attribute_value } from '../models';
import paginate from '../utils/pagination';

const Op = Sequelize.Op;

/**
 * Product controller function
 */
class ProductController {

  /**
   * @static
   * @param {object} req
   * @return {json} res
   * @description get every product in the e-commerce store.
   */
  static getAllProduct(req, res) {
    const { query } = req;
    const limit = Number(query.limit) || 20;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;
    const description_length = Number(query.description_length) || 200;

    product.findAndCountAll({
      limit,
      offset,
      // description_length: [
      //   'description',
      // ]
      attributes: ['product_id', 'name', 'description', 'price', 'discounted_price', 'thumbnail']
    })
    .then((products) => {
      const rows = products.rows;
      const pagination = paginate(products, page, limit);
      const count = pagination.totalRecords;
      return res.status(200).json({
        count,
        rows
      });
    })
    .catch(error => res.status(400).json({
      "error": {
        "status": 400,
        "code": "PRO_05",
        "message": "Product fetch Error.",
        "field": "Product"
      }
    }))
  }

  /**
   * @static
   * @param {object} req
   * @return {json} res
   * @description get every product in a category.
   */
  static getAllProductsInCategory(req, res) {
    const { category_id } = req.params;
    const { query } = req;
    const limit = Number(query.limit) || 20;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;
    const description_length = Number(query.description_length) || 200;

    if (!(Number.isInteger(Number(category_id)))) {
      return res.status(400).json({
        "error": {
          "status": 400,
          "code": "CAT_03",
          "message": "The ID is not a number.",
          "field": "category_id"
        }
      })
    }

    sequelize.query('CALL catalog_get_products_in_category(:inCategoryId, :inShortProductDescriptionLength, :inProductsPerPage, :inStartItem)',
    {
      replacements: { inCategoryId: category_id, inShortProductDescriptionLength: description_length, inProductsPerPage: limit, inStartItem: offset },
    })
    .then(Products => {
      const count = Products.length;
      return res.status(200).json({
        count,
        rows: Products
      });
    })
    .catch(error => res.status(400).json({
      "error": {
        "status": 400,
        "code": "PRO_05",
        "message": "Product fetch Error.",
        "field": "Product"
      }
    }));
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @return {json} res
   * @description get one product by Id.
   */
  static getOneProduct(req, res) {
    const { product_id } = req.params;

    if (!(Number.isInteger(Number(product_id)))) {
      return res.status(400).json({
        "error": {
          "status": 400,
          "code": "PRO_06",
          "message": "The ID is not a number.",
          "field": "product_id"
        }
      })
    }

    return product.findOne({
      where: {
        product_id
      }
    })
    .then((Product) => {
      res.status(200).json(
        Product
      );
    })
    .catch(error => res.status(400).json({
      "error": {
        "status": 400,
        "code": "PRO_05",
        "message": "Don'exist Product with this ID.",
        "field": "Product_id"
      }
    }));
  }

  /**
   * @static
   * @param {object} req
   * @return {json} res
   * @description search products
   */
  static searchForProduct(req, res, next) {
    const { query } = req;
    const limit = Number(query.limit) || 20;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;
    const description_length = Number(query.description_length) || 200;
    const query_string = query.query_string;
    const all_words = 'working on this' // no Idea on how this is yet

    product.findAndCountAll({
      limit,
      offset,
      where: {
        [Op.or]: [
          {
            name: { [Op.like]: `%${query_string}%` }
          },
          {
            description: { [Op.like]: `%${query_string}%` }
          }
        ]
      },
      attributes: ['product_id', 'name', 'description', 'price', 'discounted_price', 'thumbnail']
    })
    .then((products) => {
      const rows = products.rows;
      const pagination = paginate(products, page, limit);
      const count = pagination.totalRecords;
      return res.status(200).json({
        count,
        rows
      });
    })
    .catch(error => res.status(400).json({
      "error": {
        "status": 400,
        "code": "PRO_05",
        "message": "Product fetch Error.",
        "field": "Product"
      }
    }));
  }
}

export default ProductController;
