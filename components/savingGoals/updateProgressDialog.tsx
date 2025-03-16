import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";
import { IGoal } from "@/models/goal";

export default function UpdateProgressDialog({
  goal,
  onUpdate,
}: {
  goal: IGoal;
  onUpdate: (val: IGoal) => void;
}) {
  const [open, setOpen] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProgress = async () => {
    if (!amountToAdd || isNaN(amountToAdd) || Number(amountToAdd) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to add.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      const newAmount = goal.currentAmount + Number(amountToAdd);

      const response = await fetch(`/api/goals/${goal._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newAmount }),
      });

      if (!response.ok) {
        throw new Error("Failed to update goal progress");
      }

      const updatedGoal = await response.json();
      onUpdate(updatedGoal.goal);

      toast({
        title: "Progress Updated",
        description: `₹${amountToAdd} added to your goal.`,
      });

      setOpen(false);
      setAmountToAdd(0);
    } catch (error: any) {
      console.error("Update Progress Error:", error);
      toast({
        title: "Something went wrong",
        description: error.message || "Failed to update goal progress.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Update Progress
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Update Goal Progress</DialogTitle>
          <DialogDescription>Update your savings goal.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Label>Amount to Add</Label>
          <Input
            type="number"
            min="1"
            value={amountToAdd}
            onChange={(e) => setAmountToAdd(parseInt(e.target.value))}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleUpdateProgress} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Progress"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
