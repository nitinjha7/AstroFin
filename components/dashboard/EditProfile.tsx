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
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
  }>({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // >>>>>>> main
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updatedProfile: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Profile Update failed");
      }

      console.log(data);
      toast({
        title: "Account created!",
        description: "You've successfully registered. Please log in.",
      });
      await signOut({ redirect: false });
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description:
          error.message ||
          "Your account couldn't be created. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span className="hidden md:inline-block text-sm border p-2 border-gray-500 rounded-full hover:bg-black hover:text-white font-semibold cursor-pointer">
            {session?.user
              ?.name!?.split(" ")
              .map((word) => {
                return word[0];
              })
              .join(".") || "U"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Your profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              className="col-span-3"
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              id="username"
              value={formData.email}
              className="col-span-3"
              onChange={handleChange}
              name="email"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
          >
            {isLoading ? <Loader className="animate-spin" /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
