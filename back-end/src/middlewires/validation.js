import mongoose from "mongoose";
import Employee from "../models/employee.model.js";

const validateID = async (req, res, next) => {
  try {
    const { empId } = req.params;
    // Check EmpId Validity.
    if (!mongoose.Types.ObjectId.isValid(empId)) {
      throw {
        status: 406,
        message: "Invalid ObjectId. Object ID must be valid mongodb id.",
      };
    }
    // find employee.
    const employee = await Employee.findById(empId);
    if (!employee) {
      throw {
        status: 404,
        message: "No Employee Found With this id",
      };
    }
    req.employee = employee;
    next();
  } catch (err) {
    return res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

export default validateID;
