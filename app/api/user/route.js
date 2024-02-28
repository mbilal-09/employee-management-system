// pages/api/users/index.js

import User from "@/models/employee";
import connectToDB from "@/utils/database";
import bcrypt from "bcrypt";

export const POST = async (req) => {
    try {
        connectToDB();

        const { name, email, password, shift } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
          shift,
        });
        return new Response({ status: 201, data: user})
    } catch (error) {
          return new Response({ status: 400, success: false, error: error.message })
      }
}

export const GET = async (req) => {
  try {
    connectToDB();

    const users = await User.find({ type: "employee" });

    return new Response(JSON.stringify(users))

  } catch (error) {
    return new Response({ status: 400, success: false, error: error.message })
  }
}

// export const PUT = async (req, { params }) => {
//     try {
//        console.log(params.id);
//         const { name, email, password, shift } = await req.json();
//         const updatedUser = await User.findByIdAndUpdate(
//             params.id,
//           { name, email, password, shift },
//           { new: true }
//         );
//         return new Response({ status: 201, data: updatedUser});
//       } catch (error) {
//         return new Response({ status: 400, success: false, error: error.message })
//       }
// }