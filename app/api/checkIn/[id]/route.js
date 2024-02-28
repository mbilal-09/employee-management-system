import CheckIn from "@/models/checkIn";
import connectToDB from "@/utils/database";

export const POST = async (req, { params }) => {
    try {
      // Connect to the database
      await connectToDB();
  
      // Get current month
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  
      // Get current date
      const currentDateStr = currentDate.toLocaleDateString();
  
      // Get current time
      const currentTimeStr = currentDate.toLocaleTimeString();

      // Create a new check-in record
      const checkIn = new CheckIn({
        userId: params.id,
        month: currentMonth,
        date: currentDateStr,
        time: currentTimeStr,
      });
  
      // Save the check-in record to the database
      await checkIn.save();
  
      // Return the created check-in data
      return new Response({ status: 201, data: checkIn})
    } catch (error) {
      // Return error response if an error occurs
      return new Response({ status: 400, success: false, error: error.message })
    }
  };