// Controllers.
import {
  addEmployee,
  allEmployees,
  employeeDetails,
  updateEmployeeInfo,
  toggleEmployeeBlockStatus,
  removeEmployee,
} from "../controllers/employee.controller.js";

// Middle Wire
import validateID from "../middlewires/validation.js";

import express from "express";
const router = express.Router();

// Get Methods.
router.get("/", allEmployees);
router.get("/:empId", validateID, employeeDetails);

// Post Methods.
router.post("/", addEmployee);

// Patch Methods.
router.patch("/:empId/status", validateID, toggleEmployeeBlockStatus);
router.patch("/:empId", validateID, updateEmployeeInfo);

// Delete Methods
router.delete("/:empId", validateID, removeEmployee);

export default router;
