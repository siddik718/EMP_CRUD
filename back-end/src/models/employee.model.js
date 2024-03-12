import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "First Name Can not be undefined"],
      minLength: [2, "First Name Must minimum 2 length."],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last Name Can not be undefined"],
      minLength: [2, "Last Name Must minimum 2 length."],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email Can not be undefined"],
      lowercase: true,
      unique: [true, "Email Already Exist"],
      validate: [validateEmail, "Please provide a valid email address"],
    },
    phoneNumber: {
      type: String,
      trim: true,
      minLength: [11, "Phone number can be minimum 11 character long"],
      maxLength: [13, "Phone number can be maxiimum 13 character long"],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Employee = model("Employee", schema);

export default Employee;

function validateEmail(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}
