import { Schema, model, models } from "mongoose";

// Define the schema for the check-in model

const CheckInSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: [true, "User ID is required!"],
  },
  month: {
    type: String,
    required: [true, "Month is required!"],
  },
  date: {
    type: String,
    required: [true, "Date is required!"],
  },
  time: {
    type: String,
    required: [true, "Time is required!"],
  },
});

const CheckIn = models.CheckIn || model("CheckIn", CheckInSchema);

export default CheckIn;
