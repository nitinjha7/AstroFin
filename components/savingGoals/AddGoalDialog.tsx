"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface AddGoalDialogProps {
  onAdd: (newGoal: Goal) => void;
  setOpen: (open: boolean) => void;
}

interface Goal {
  _id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
}

export default function AddGoalDialog({ onAdd, setOpen }: AddGoalDialogProps) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddGoal = async () => {
    if (!name || !targetAmount) {
      toast({
        title: "Error",
        description: "Goal name and target amount are required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          targetAmount: Number(targetAmount),
          currentAmount: 0, // Start with 0
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add goal");
      }

      const newGoal = await response.json();
      onAdd(newGoal.goal); // Update the goals list
      setOpen(false); // Close the dialog

      toast({
        title: "Success",
        description: "Goal added successfully!",
        variant: "success",
      });

      // Reset form
      setName("");
      setDescription("");
      setTargetAmount("");
    } catch (error) {
      console.error("Error adding goal:", error);
      toast({
        title: "Error",
        description: "Failed to add goal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Goal</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="name">Goal Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="targetAmount">Target Amount (₹)</Label>
          <Input
            id="targetAmount"
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleAddGoal} disabled={loading}>
          {loading ? "Adding..." : "Add Goal"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
