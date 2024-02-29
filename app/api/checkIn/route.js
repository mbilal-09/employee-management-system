// pages/api/checkIn.js

import connectToDB from '@/utils/database';
import CheckIn from '@/models/checkIn';

export const GET = async (req, res) => {

    const searchParams = req.nextUrl.searchParams;
    const shift = searchParams.get("shift");
    const month = searchParams.get("month");

  try {
    await connectToDB();

    // Use .find() to filter check-ins based on shift and month
    const checkIns = await CheckIn.find({ shift, month }).populate('userId');

    // Return the filtered check-ins
    return new Response(JSON.stringify(checkIns), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ status: 400, success: false, error: error.message }), { status: 400 });
  }
}
