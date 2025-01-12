import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { z } from "zod";

const scheduleSchema = z.object({
  id: z.string().optional(),
  from: z.string(),
  to: z.string(),
  departure: z.string(),
  arrival: z.string(),
  price: z.number(),
  trainNumber: z.string().optional(),
});

export type Schedule = z.infer<typeof scheduleSchema>;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const scheduleData = scheduleSchema.parse(body);

    const normalizedFrom =
      scheduleData.from.charAt(0).toUpperCase() +
      scheduleData.from.slice(1).toLowerCase();
    const normalizedTo =
      scheduleData.to.charAt(0).toUpperCase() +
      scheduleData.to.slice(1).toLowerCase();

    const key = `schedules:${normalizedFrom.toLowerCase()}:${normalizedTo.toLowerCase()}`;
    const schedules = (await kv.get<any[]>(key)) || [];

    const newSchedule = {
      id: `${normalizedFrom}-${normalizedTo}-${Date.now()}`,
      ...scheduleData,
      from: normalizedFrom,
      to: normalizedTo,
    };

    await kv.set(key, [...schedules, newSchedule]);

    return NextResponse.json(newSchedule, { status: 201 });
  } catch (error) {
    console.error("Failed to add schedule:", error);
    return NextResponse.json(
      { error: "Failed to add schedule" },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const schedule = scheduleSchema.parse(body);

    const normalizedFrom =
      schedule.from.charAt(0).toUpperCase() +
      schedule.from.slice(1).toLowerCase();
    const normalizedTo =
      schedule.to.charAt(0).toUpperCase() + schedule.to.slice(1).toLowerCase();

    const key = `schedules:${normalizedFrom.toLowerCase()}:${normalizedTo.toLowerCase()}`;
    const schedules = (await kv.get<Schedule[]>(key)) || [];

    const updatedSchedules = schedules.map((s) =>
      s.id === schedule.id
        ? { ...schedule, from: normalizedFrom, to: normalizedTo }
        : s
    );

    await kv.set(key, updatedSchedules);

    return NextResponse.json(schedule);
  } catch (error) {
    console.error("Failed to update schedule:", error);
    return NextResponse.json(
      { error: "Failed to update schedule" },
      { status: 400 }
    );
  }
}
