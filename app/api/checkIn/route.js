// pages/api/checkIn.js

import connectToDB from '@/utils/database';
import CheckIn from '@/models/checkIn';

export const GET = async (req, res) => {

    const searchParams = req.nextUrl.searchParams;
    const shift = searchParams.get("shift");
    const month = searchParams.get("month");

    console.log("shift", shift, "month", month);

  try {
    await connectToDB();

    // Use .find() to filter check-ins based on shift and month
    let checkIns = await CheckIn.find({ month }).populate('userId');

    if (checkIns?.length > 0) {
      checkIns.forEach((checkIn) => {
          if (checkIn.userId) {
              // Remove the password field from the user object
              checkIn.userId.password = undefined;
          }
      });
  }

  checkIns = checkIns?.filter((e) => e.userId?.shift === shift)

    // Return the filtered check-ins
    return new Response(JSON.stringify(checkIns), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ status: 400, success: false, error: error.message }), { status: 400 });
  }
}
