// pages/api/users/index.js

import User from "@/models/employee";
import connectToDB from "@/utils/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await connectToDB();

  console.log(req);

  switch (req.method) {
    case "POST":
      // Create user
      try {
        const { name, email, password, shift } = req.body;
        console.log(name, email, password, shift);
        // const hashedPassword = await bcrypt.hash(password, 10);
        // const user = await User.create({
        //   name,
        //   email,
        //   password: hashedPassword,
        //   shift,
        // });
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    
    case "PUT":
      // Update user
      try {
        const { id } = req.query;
        const { name, email, password, shift } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { name, email, password, shift },
          { new: true }
        );
        res.status(200).json({ success: true, data: updatedUser });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "DELETE":
      // Delete user
      try {
        const { id } = req.query;
        await User.findByIdAndDelete(id);
        res
          .status(200)
          .json({ success: true, message: "User deleted successfully" });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
      break;
  }
}
