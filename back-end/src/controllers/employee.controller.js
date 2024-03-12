import Employee from "../models/employee.model.js";

export const addEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;

    // Check if any data is not provided.
    if (!firstName || !lastName || !email || !phoneNumber) {
      throw {
        status: 406,
        message:
          "firstName or lastName or email or phoneNumber is undefined. please provide value.",
      };
    }

    // Check if firstName and lastName minimum 2 length long.
    if (firstName.length < 2 || lastName.length < 2) {
      throw {
        status: 406,
        message: "First Name & Last Name must be atleast 2 length long.",
      };
    }
    // Check if phoneNumber between 11 - 13.
    if (phoneNumber.length < 11 || phoneNumber.length > 13) {
      throw {
        status: 406,
        message: "Phone Number Can be 11-13 digit long",
      };
    }
    // Validate Email.
    if (!validateEmail(email)) {
      throw {
        status: 406,
        message: "Please Choose a valid email eaddress",
      };
    }

    // Check if email / phone already exist.
    const isDuplicateFound = await Employee.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });

    if (isDuplicateFound) {
      throw {
        status: 400,
        message: "Email or Phone Number Already exist",
      };
    }

    // Create A new Employee document.
    const newEmployee = new Employee(req.body);
    // save to database.
    await newEmployee.save();
    return res.status(201).json({
      message: "Data Saved",
      newEmployee,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

export const allEmployees = async (req, res) => {
  try {
    // Find all employee info.Don't send email and phone Number. Only send them in details.
    const employees = await Employee.find().select("-email -phoneNumber");
    return res.status(200).json({
      message: "Successful Data Retrive",
      employees,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const employeeDetails = async (req, res) => {
  try {
    const { employee } = req;
    return res.status(200).json({
      message: "Data Found",
      employee,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateEmployeeInfo = async (req, res) => {
  try {
    const { empId } = req.params;
    if (Object.keys(req.body).length === 0) {
      throw {
        status: 406,
        message: "No Data Provided to update.",
      };
    }
    if (req.body.hasOwnProperty("email")) {
      throw {
        status: 406,
        message: "Can not update email",
      };
    }
    const updatedData = await Employee.findByIdAndUpdate(empId, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "Data Updated",
      updatedData,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

export const toggleEmployeeBlockStatus = async (req, res) => {
  try {
    const {
      params: { empId },
      employee,
    } = req;
    const updatedData = await Employee.findByIdAndUpdate(
      empId,
      { $set: { isBlocked: !employee.isBlocked } },
      { new: true }
    );
    return res.status(200).json({
      message: "Data Updated",
      updatedData,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

export const removeEmployee = async (req, res) => {
  try {
    const { empId } = req.params;
    // delete employee.
    await Employee.findByIdAndDelete(empId);
    return res.status(200).json({
      message: "Data Removed",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

function validateEmail(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}
