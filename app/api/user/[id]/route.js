import User from "@/models/employee";
import connectToDB from "@/utils/database";

export const DELETE = async (req, { params }) => {
    try {
        connectToDB();

        const { id } = params;
        
        await User.findByIdAndDelete(id);
        return new Response({ status: 201, message: "User deleted successfully"});

      } catch (error) {
        return new Response({ status: 400, success: false, error: error.message })
      }
}