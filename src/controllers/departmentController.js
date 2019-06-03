import { department } from '../models';

/**
 * department Controller function
 */
class DepartmentController {

  /**
   * @param {object} req
   * @return {json} res
   * @description get every department in the app
   */
  static getDepartment(req, res) {
    return department.findAll()
    .then((departments) => {
      res.status(200).json({
        departments
      });
    })
    .catch(error => res.status(400).json({
      "error": {
        "status": 400,
        "code": "DEP_03",
        "message": "Departments not found.",
        "field": "departments"
      }
    }))
  }

  /**
   * @static
   * @param {object} req
   * @return {json} res
   * @description get departments by id.
   */
  static getOneDepartment(req, res) {
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

    return department.findOne({
      where: {
        department_id
      }
    })
      .then((departments) => {
        if (departments) {
          return res.status(200).json({
            departments
          });
        } else {
          return res.status(400).json({
            "error": {
              "status": 400,
              "code": "DEP_02",
              "message": "Don'exist department with this ID.",
              "field": "department_id"
            }
          })
        }
      })
      .catch(error => res.status(400).json({
        "error": {
          "status": 400,
          "code": "DEP_02",
          "message": "Don'exist department with this ID.",
          "field": "department_id"
        }
      }))
  }
}

export default DepartmentController;
