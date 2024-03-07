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
        const currentTimeStr = await fetch("http://worldtimeapi.org/api/timezone/Asia/Karachi")

        const currTime = await currentTimeStr.json();

        let dayNight = Number(currTime.datetime.slice(11, 13))

        if (dayNight >= 12) {
            dayNight = "PM"
        } else {
            dayNight ="AM"
        }

        // Get current month name
        const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });

        // Create a new check-in record
        const checkIn = new CheckIn({
            userId: params.id,
            month: currentMonthName,
            date: currentDateStr,
            time: `${currTime.datetime.slice(11, 19)} ${dayNight}`,
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

// export const PUT = async (req, { params }) => {
//     try {
//         // Connect to the database
//         await connectToDB();

//         // Get current date
//         const currentDate = new Date();

//         // Get current month
//         const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based

//         // Get current day
//         const currentDay = String(currentDate.getDate()).padStart(2, '0');

//         // Combine current day and month in the desired format
//         const currentDateStr = `${currentDay}/${currentMonth}`;

//         // Get current time
//         const currentTimeStr = await fetch("http://worldtimeapi.org/api/timezone/Asia/Karachi")

//         const currTime = await currentTimeStr.json();

//         // Get current month name
//         const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });

//         // Create a new check-in record
//         const checkIn = new CheckIn({
//             userId: params.id,
//             month: currentMonthName,
//             date: currentDateStr,
//             time: currTime.datetime.slice(11, 19),
//         });

//         // Save the check-in record to the database
//         await checkIn.save();

//         // Return the created check-in data
//         return new Response({ status: 201, data: checkIn });
//     } catch (error) {
//         // Return error response if an error occurs
//         return new Response({ status: 400, success: false, error: error.message });
//     }
// };
