import CheckIn from "@/models/checkIn";
import connectToDB from "@/utils/database";

export const POST = async (req, { params }) => {
    try {
        // Connect to the database
        await connectToDB();

        // Get current date
        const currentDate = new Date();

        // Get current month
        const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based

        // Get current day
        const currentDay = String(currentDate.getDate()).padStart(2, '0');

        // Combine current day and month in the desired format
        const currentDateStr = `${currentDay}/${currentMonth}`;

        // Get current time
        const currentTimeStr = currentDate.toLocaleTimeString();

        // Get current month name
        const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });

        // Create a new check-in record
        const checkIn = new CheckIn({
            userId: params.id,
            month: currentMonthName,
            date: currentDateStr,
            time: currentTimeStr,
        });

        // Save the check-in record to the database
        await checkIn.save();

        // Return the created check-in data
        return new Response({ status: 201, data: checkIn });
    } catch (error) {
        // Return error response if an error occurs
        return new Response({ status: 400, success: false, error: error.message });
    }
};
