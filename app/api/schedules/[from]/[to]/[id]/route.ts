import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { Schedule } from "@/lib/api";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ from: string; to: string; id: string }> }
) {
  try {
    const { id, from: rawFrom, to: rawTo } = await params;
    // Decode and normalize the route parameters
    const from = decodeURIComponent(rawFrom).toLowerCase();
    const to = decodeURIComponent(rawTo).toLowerCase();
    const schedule = await request.json();

    // Get schedules for this route
    const key = `schedules:${from}:${to}`;
    console.log("Searching for schedule with key:", key);
    const schedules = await kv.get<Schedule[]>(key);
    console.log("Found schedules:", schedules);

    if (schedules) {
      const scheduleIndex = schedules.findIndex((s) => s.id === id);
      console.log("Schedule index:", scheduleIndex, "for ID:", id);
      if (scheduleIndex !== -1) {
        // Update the schedule
        schedules[scheduleIndex] = {
          ...schedules[scheduleIndex],
          ...schedule,
          id, // Ensure ID remains unchanged
          from, // Keep route info
          to,
        };
        await kv.set(key, schedules);
        return NextResponse.json(schedules[scheduleIndex]);
      }
    }

    return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
  } catch (error) {
    console.error("Failed to update schedule:", error);
    return NextResponse.json(
      { error: "Failed to update schedule" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ from: string; to: string; id: string }> }
) {
  try {
    // Decode and normalize the route parameters
    const { id, from: rawFrom, to: rawTo } = await params;
    const from = decodeURIComponent(rawFrom).toLowerCase();
    const to = decodeURIComponent(rawTo).toLowerCase();

    // Get schedules for this route
    const key = `schedules:${from}:${to}`;
    const schedules = await kv.get<Schedule[]>(key);

    if (schedules) {
      const updatedSchedules = schedules.filter(
        (schedule) => schedule.id !== id
      );
      if (updatedSchedules.length < schedules.length) {
        // We found and removed the schedule
        await kv.set(key, updatedSchedules);
        return NextResponse.json({
          message: "Schedule deleted successfully",
        });
      }
    }

    return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
  } catch (error) {
    console.error("Failed to delete schedule:", error);
    return NextResponse.json(
      { error: "Failed to delete schedule" },
      { status: 500 }
    );
  }
}
