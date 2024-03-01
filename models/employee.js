import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  shift: {
    type: String,
    enum: ["morning", "evening", "night"],
    required: [true, "Shift is required!"],
  },
  type: {
    type: String,
    enum: ["employee"],
    default: "employee",
  },
});

// Check if the model already exists, otherwise create it
const User = models.users || model("users", userSchema);

export default User;
