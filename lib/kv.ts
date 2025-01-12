import { kv } from "@vercel/kv";
import { Schedule } from "./api";

const DEFAULT_SCHEDULES: Record<string, Schedule[]> = {
  "chlef-algiers": [
    {
      id: "1",
      trainNumber: "1084",
      from: "Chlef",
      to: "Algiers",
      departure: "05:00",
      arrival: "07:30",
      price: 435,
    },
    {
      id: "2",
      trainNumber: "1002",
      from: "Chlef",
      to: "Algiers",
      departure: "08:31",
      arrival: "11:00",
      price: 435,
    },
    {
      id: "3",
      trainNumber: "B150",
      from: "Chlef",
      to: "Algiers",
      departure: "10:30",
      arrival: "13:00",
      price: 180,
    },
    {
      id: "4",
      trainNumber: "1004",
      from: "Chlef",
      to: "Algiers",
      departure: "16:33",
      arrival: "19:00",
      price: 435,
    },
    {
      id: "5",
      trainNumber: "1088",
      from: "Chlef",
      to: "Algiers",
      departure: "17:10",
      arrival: "19:40",
      price: 435,
    },
    {
      id: "6",
      trainNumber: "1006",
      from: "Chlef",
      to: "Algiers",
      departure: "19:07",
      arrival: "21:30",
      price: 665,
    },
  ],
  "algiers-chlef": [
    {
      id: "1",
      trainNumber: "1001",
      from: "Algiers",
      to: "Chlef",
      departure: "05:50",
      arrival: "08:20",
      price: 455,
    },
    {
      id: "2",
      trainNumber: "AM",
      from: "Algiers",
      to: "Chlef",
      departure: "08:00",
      arrival: "10:30",
      price: 885,
    },
    {
      id: "3",
      trainNumber: "B151",
      from: "Algiers",
      to: "Chlef",
      departure: "13:50",
      arrival: "16:20",
      price: 180,
    },
    {
      id: "4",
      trainNumber: "1003",
      from: "Algiers",
      to: "Chlef",
      departure: "14:00",
      arrival: "16:30",
      price: 435,
    },
    {
      id: "5",
      trainNumber: "1005",
      from: "Algiers",
      to: "Chlef",
      departure: "17:00",
      arrival: "19:30",
      price: 665,
    },
    {
      id: "6",
      trainNumber: "1085",
      from: "Algiers",
      to: "Chlef",
      departure: "17:20",
      arrival: "19:50",
      price: 555,
    },
  ],
};

// Function to clean up all KV data
export async function cleanupKVData() {
  try {
    // Get all keys
    const keys = await kv.keys("*");
    // Delete all keys
    if (keys.length > 0) {
      await kv.del(...keys);
    }
    return true;
  } catch (error) {
    console.error("Error cleaning up KV data:", error);
    return false;
  }
}

// Initialize default data
export async function initializeDefaultData() {
  try {
    // Clean up first
    await cleanupKVData();

    // Set default schedules
    for (const [key, schedules] of Object.entries(DEFAULT_SCHEDULES)) {
      const [from, to] = key.split("-");
      const storageKey = `schedules:${from}:${to}`;
      await kv.set(storageKey, schedules);
    }
    return true;
  } catch (error) {
    console.error("Error initializing default data:", error);
    return false;
  }
}

export async function getSchedules(
  from: string,
  to: string
): Promise<Schedule[]> {
  const key = `schedules:${from}:${to}`;
  const schedules = await kv.get<Schedule[]>(key);

  if (!schedules) {
    // Check if we have default data for this route
    const defaultKey = `${from}-${to}`;
    const defaultData = DEFAULT_SCHEDULES[defaultKey];

    if (defaultData) {
      await kv.set(key, defaultData);
      return defaultData;
    }

    return [];
  }

  return schedules;
}

export async function updateSchedule(
  from: string,
  to: string,
  updatedSchedule: Schedule
): Promise<Schedule> {
  const key = `schedules:${from}:${to}`;
  const schedules = (await kv.get<Schedule[]>(key)) || [];

  const updatedSchedules = schedules.map((schedule) =>
    schedule.id === updatedSchedule.id ? updatedSchedule : schedule
  );

  await kv.set(key, updatedSchedules);

  // Store the change in pending changes for moderation
  const pendingKey = `pending:${from}:${to}`;
  const pendingChanges = (await kv.get<Schedule[]>(pendingKey)) || [];
  await kv.set(pendingKey, [...pendingChanges, updatedSchedule]);

  return updatedSchedule;
}

export async function clearAllSchedules() {
  try {
    const keys = await kv.keys("*");
    if (keys.length > 0) {
      await kv.del(...keys);
    }
    return true;
  } catch (error) {
    console.error("Error clearing all schedules:", error);
    return false;
  }
}

// console.log(await getSchedules("chlef", "algiers"));

import Redis from "ioredis";

const client = new Redis(
  "rediss://default:AZs_AAIjcDEyNjhlZDY2NTkwNTM0NGUwOTc5YjE5MTIwMDIxZTMyMXAxMA@ready-rodent-39743.upstash.io:6379"
);
