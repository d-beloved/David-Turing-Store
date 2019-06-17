import { product, sequelize } from '../models';

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
  static getAllProduct(req, res, next) {
    const { query } = req;
    const limit = Number(query.limit) || 20;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;
    const description_length = Number(query.description_length) || 200;

    sequelize.query(`Select product_id, name,
          if(length(description) <= :description_length, description, concat(left(description, :description_length), '...'))
          as description, price, discounted_price, thumbnail from product ORDER BY product_id ASC limit :offset, :limit`,
    {
      replacements: { description_length: description_length, offset: offset, limit: limit}
    })
    .then((products) => {
      sequelize.query('SELECT COUNT(*) FROM product').then(count => {
        const totalCount = count[0][0]['COUNT(*)']
        return res.status(200).json({
          count: totalCount,
          rows: products[0]
        });
      }).catch(next)
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
  static getAllProductsInCategory(req, res, next) {
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
      sequelize.query('call catalog_count_products_in_category(:inCategoryId)',
      {
        replacements: { inCategoryId: category_id }
      }).then(count => {
        return res.status(200).json({
          count: count[0]['categories_count'],
          rows: Products
        });
      }).catch(next)
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
    const all_words = req.query.all_words || 'on';

    if (query_string === '' || query_string === undefined) {
      return res.status(400).json({
        "error": {
          "status": 400,
          "code": "USR_02",
          "message": "The field(s) are/is required.",
          "field": "query_string"
        }
      })
    }
    else {
      sequelize.query('CALL catalog_search(:inSearchString, :inAllWords, :inShortProductDescriptionLength, :inProductsPerPage, :inStartItem)',
      {
        replacements: {inSearchString: query_string, inAllWords: all_words, inShortProductDescriptionLength: description_length, inProductsPerPage: limit, inStartItem: offset}
      })
      .then((products) => {
        sequelize.query('CALL catalog_count_search_result(:inSearchString, :inAllWords)',
        {
          replacements: {inSearchString: query_string, inAllWords: all_words}
        }).then(count => {
          return res.status(200).json({
            count: count[0]['count(*)'],
            rows: products
          });
        }).catch(next)
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

  /**
   * @static
   * @param {object} req
   * @return {json} res
   * @description get every product in a departmenr.
   */
  static getAllProductsInDepartment(req, res) {
    const { department_id } = req.params;
    const { query } = req;
    const limit = Number(query.limit) || 20;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;
    const description_length = Number(query.description_length) || 200;

    if (!(Number.isInteger(Number(department_id)))) {
      return res.status(400).json(
        {
          "status": 400,
          "code": "DEP_01",
          "message": "The ID is not a number.",
          "field": "department_id"
        }
      )
    }

    sequelize.query('CALL catalog_get_products_on_department(:inDepartmentId, :inShortProductDescriptionLength, :inProductsPerPage, :inStartItem)',
    {
      replacements: { inDepartmentId: department_id, inShortProductDescriptionLength: description_length, inProductsPerPage: limit, inStartItem: offset },
    })
    .then(Products => {
      sequelize.query('CALL catalog_count_products_on_department(:inDepartmentId)',
      {
        replacements: {inDepartmentId: department_id}
      }).then(count => {
        return res.status(200).json({
          count: count[0]['products_on_department_count'],
          rows: Products
        });
      })
    })
    .catch(error => res.status(400).json(
      {
        "code": "PRO_05",
        "message": "Product fetch Error.",
        "field": "Product",
        "status": 400
      }
    ));
  }
}

export default ProductController;
