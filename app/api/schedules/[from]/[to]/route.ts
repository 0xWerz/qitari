import { NextResponse } from "next/server";
import { getSchedules } from "@/lib/kv";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ from: string; to: string }> }
) {
  try {
    const { from, to } = await params;

    // Get schedules using the kv helper which handles default data
    const schedules = await getSchedules(from.toLowerCase(), to.toLowerCase());

    return NextResponse.json(schedules || []);
  } catch (error) {
    console.error("Failed to get schedules:", error);
    return NextResponse.json(
      { error: "Failed to get schedules" },
      { status: 500 }
    );
  }
}
