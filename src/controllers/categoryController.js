import { category, product_category } from '../models';
import paginate from '../utils/pagination';

/**
 * Controller function for categories
 */
class CategoryController {

  /**
   * @static
   * @param {object} req
   * @return {object} res
   * @description get all Categories in the app
   */
  static getCategories({ query }, res) {
    const limit = Number(query.limit) || 20;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;

    category.findAndCountAll({
      limit,
      offset,
      order: [
        ['category_id', 'ASC'],
        ['name', 'DESC']
      ]
    })
    .then((categories) => {
      const rows = categories.rows;
      const pagination = paginate(categories, page, limit);
      const count = pagination.totalRecords;
      return res.status(200).json({
        count,
        rows
      });
    })
    .catch(error => res.status(400).json({
      "error": {
        "status": 400,
        "code": "CAT_02",
        "message": "Category Error.",
        "field": "categories"
      }
    }))
  }

  /**
   * @static
   * @param {object} req
   * @return {json} res
   * @description get categories by id.
   */
  static getOneCategory(req, res) {
    const { category_id } = req.params;

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

    return category.findOne({
      where: { category_id }
    })
    .then((categories) => {
      if (categories) {
        res.status(200).json(
          categories
        )
      } else {
        res.status(400).json({
          "error": {
            "status": 400,
            "code": "CAT_01",
            "message": "Don't exist category with this ID.",
            "field": "category_id"
          }
        })
      }
    })
    .catch(error => res.status(500).json({
      "error": {
        "status": 500,
        "code": "CAT_04",
        "message": "Something went wrong",
        "field": "undefined"
      }
    }))
  }

  /**
   * @static
   * @param {object} req
   * @return {json} res
   * @description get product's category.
   */
  static getProductCategory(req, res) {
    const { product_id } = req.params;

    if (!(Number.isInteger(Number(product_id)))) {
      return res.status(400).json({
        "error": {
          "status": 400,
          "code": "PROD_01",
          "message": "The ID is not a number.",
          "field": "product_id"
        }
      })
    }

    product_category.findOne({
      where: { product_id }
    })
    .then((foundProduct) => {
      if (foundProduct) {
        const { category_id } = foundProduct
        return category.findAll({
          where: {
            category_id
          },
          attributes: ['category_id', 'department_id', 'name']
        })
        .then((foundProductCategory) => {
          res.status(200).json(
            foundProductCategory
          )
        })
      } else {
        const foundProductCategory = []
        res.status(200).json(
          foundProductCategory
        )
      }
    })
    .catch(error => res.status(500).json({
      "error": {
        "status": 500,
        "code": "CAT_04",
        "message": "Something went wrong",
        "field": "undefined"
      }
    }))
  }

  /**
   * @static
   * @param {object} req
   * @return {json} res
   * @description get categories of a department.
   */
  static getDepartmentCategory(req, res) {
    const { department_id } = req.params;

    if (!(Number.isInteger(Number(department_id)))) {
      return res.status(400).json({
        "error": {
          "status": 400,
          "code": "DEP_01",
          "message": "The ID is not a number.",
          "field": "department_id"
        }
      })
    }

    return category.findAll({
      where: { department_id }
    })
    .then((categories) => {
      res.status(200).json(
        categories
      );
    })
    .catch(error => res.status(500).json({
      "error": {
        "status": 500,
        "code": "DEP_04",
        "message": "Something went wrong",
        "field": "department_id"
      }
    }))
  }
}

export default CategoryController;
