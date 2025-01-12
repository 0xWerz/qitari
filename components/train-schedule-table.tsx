"use client";

import { useState } from "react";
import { Schedule } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Save, Trash, X } from "lucide-react";

interface TrainScheduleTableProps {
  schedules: Schedule[];
  from: string;
  to: string;
}

export default function TrainScheduleTable({
  schedules,
  from,
  to,
}: TrainScheduleTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedSchedule, setEditedSchedule] = useState<Schedule | null>(null);
  const { toast } = useToast();
  const decodedFrom = decodeURIComponent(from);
  const decodedTo = decodeURIComponent(to);

  const handleEdit = (schedule: Schedule) => {
    setEditingId(schedule.id);
    setEditedSchedule({ ...schedule });
  };

  const handleSave = async () => {
    if (!editedSchedule) return;

    try {
      // Prepare the schedule data without from/to (they're in the URL)
      const { from: _f, to: _t, ...scheduleData } = editedSchedule;

      const response = await fetch(
        `/api/schedules/${from}/${to}/${editedSchedule.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(scheduleData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update schedule");
      }

      toast({
        title: "Success",
        description: "Schedule updated successfully",
      });
      setEditingId(null);
      setEditedSchedule(null);
      // Refresh the page to show the updated schedule
      window.location.reload();
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update schedule",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (schedule: Schedule) => {
    try {
      const response = await fetch(
        `/api/schedules/${from}/${to}/${schedule.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete schedule");
      }

      toast({
        title: "Success",
        description: "Schedule deleted successfully",
      });
      // Refresh the page to show the updated list
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete schedule",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedSchedule(null);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Train</TableHead>
            <TableHead className="w-[150px]">{decodedFrom}</TableHead>
            <TableHead className="w-[150px]">{decodedTo}</TableHead>
            <TableHead className="w-[120px] text-right">Prix</TableHead>
            <TableHead className="w-[120px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow key={schedule.id}>
              {editingId === schedule.id ? (
                <>
                  <TableCell className="p-2">
                    <Input
                      value={editedSchedule?.trainNumber || ""}
                      onChange={(e) =>
                        setEditedSchedule((prev) =>
                          prev
                            ? {
                                ...prev,
                                trainNumber: e.target.value,
                              }
                            : null
                        )
                      }
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      type="time"
                      value={editedSchedule?.departure || ""}
                      onChange={(e) =>
                        setEditedSchedule((prev) =>
                          prev
                            ? {
                                ...prev,
                                departure: e.target.value,
                              }
                            : null
                        )
                      }
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      type="time"
                      value={editedSchedule?.arrival || ""}
                      onChange={(e) =>
                        setEditedSchedule((prev) =>
                          prev
                            ? {
                                ...prev,
                                arrival: e.target.value,
                              }
                            : null
                        )
                      }
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      type="number"
                      value={editedSchedule?.price || ""}
                      onChange={(e) =>
                        setEditedSchedule((prev) =>
                          prev
                            ? {
                                ...prev,
                                price: parseInt(e.target.value, 10),
                              }
                            : null
                        )
                      }
                      className="h-8 text-right"
                    />
                  </TableCell>
                  <TableCell className="p-2 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleSave}
                        className="h-9 w-9 p-0"
                      >
                        <Save className="h-5 w-5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancel}
                        className="h-9 w-9 p-0"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="font-medium">
                    {schedule.trainNumber}
                  </TableCell>
                  <TableCell>{schedule.departure}</TableCell>
                  <TableCell>{schedule.arrival}</TableCell>
                  <TableCell className="text-right">
                    {schedule.price} DZD
                  </TableCell>
                  <TableCell className="p-2 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(schedule)}
                        className="h-9 w-9 p-0"
                      >
                        <Pencil className="h-5 w-5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(schedule)}
                        className="h-9 w-9 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash className="h-5 w-5" />
                      </Button>
                    </div>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
