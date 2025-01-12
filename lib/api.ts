export interface Schedule {
  id: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
  trainNumber: string;
}

export async function getSchedules(
  from: string,
  to: string
): Promise<Schedule[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const response = await fetch(
      `${baseUrl}/api/schedules/${from.toLowerCase()}/${to.toLowerCase()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch schedules");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return [];
  }
}

export async function createSchedule(schedule: Schedule): Promise<Schedule> {
  const response = await fetch("/api/schedules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });

  if (!response.ok) {
    throw new Error("Failed to create schedule");
  }
  return response.json();
}

export async function updateSchedule(schedule: Schedule): Promise<Schedule> {
  if (!schedule.id) {
    throw new Error("Schedule ID is required for updates");
  }

  const response = await fetch("/api/schedules", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });

  if (!response.ok) {
    throw new Error("Failed to update schedule");
  }
  return response.json();
}
