"use client";
import { useEffect, useState } from "react";
import { decodeJwt } from "jose";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
interface UserType {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface DecryptedDataType {
  id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
  exp: number;
}

const formSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required." })
    .min(2, "Full name must be at least 2 characters long."),
  email: z
    .string({ required_error: "Email is required." })
    .email("Please enter a valid email address."),
  phoneNumber: z.string({ required_error: "Phone number is required." }),
  confirmPass: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function InfoUpdate() {
  const [cookies] = useCookies(["user"]);
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataPut, setDataPut] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      confirmPass: "",
    },
  });

  useEffect(() => {
    async function getUserInfo() {
      const token = cookies.user;
      if (!token) {
        router.back();
        return;
      }

      try {
        const decodedJWT = decodeJwt(token) as DecryptedDataType;
        const data = await getUser(decodedJWT.id);
        setFetchedData(data);
        form.reset({
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user data. Please try again.",
        });
        router.back();
      }
    }
    getUserInfo();
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.user, router, form, toast]);

  async function getUser(id: string): Promise<UserType> {
    const call = await fetch("http://localhost:3000/api/getuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: id }),
    });

    const response = await call.json();

    if (!call.ok) {
      form.setError("confirmPass", {
        type: "custom",
        message: response.message,
      });
    }
    setDataPut(true);
    return response;
  }

  async function updateUser(data: FormValues) {
    const id = fetchedData?._id;

    const response = await fetch("http://localhost:3000/api/updateUser", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, id }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user data");
    }

    return response.json();
  }

  const onSubmit = async (data: FormValues) => {
    if (
      data.fullName === fetchedData?.fullName &&
      data.email === fetchedData?.email &&
      data.phoneNumber === fetchedData?.phoneNumber
    ) {
      form.setError("phoneNumber", {
        type: "custom",
        message:
          "No changes detected. Please modify the data before submitting.",
      });
    } else {
      console.log("this triggered");

      setIsDialogOpen(true);
    }
  };

  const handleFinalSubmit = async () => {
    try {
      const updatedData = form.getValues();
      console.log("the datas: ", updatedData);

      await updateUser(updatedData);
      toast({
        title: "Success",
        description: "Your profile has been updated.",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to update user data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    }
  };

  const handleReset = () => {
    if (fetchedData) {
      form.reset({
        fullName: fetchedData.fullName,
        email: fetchedData.email,
        phoneNumber: fetchedData.phoneNumber,
      });
    }
  };

  if (loading) {
    return (
      <Card className="p-6 grid gap-y-4">
        <Skeleton className="h-[30px] w-[400px]" />
        <Skeleton className="h-[20px] w-[600px]" />
        <Skeleton className="w-20 h-20 rounded-full" />
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[40px] w-full" />
        <div className="w-full flex flex-row justify-between items-center">
          <Skeleton className="h-[40px] w-[200px]" />
          <Skeleton className="h-[40px] w-[200px]" />
        </div>
      </Card>
    );
  }

  return (
    <FormProvider {...form}>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account information here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt={form.getValues("fullName") || "User"}
                    />
                    <AvatarFallback>
                      {(form.getValues("fullName") || "U").charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button type="button" variant="outline">
                    Change Avatar
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="fullName">Full Name</Label>
                      <FormControl>
                        <Input id="fullName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input type="email" id="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <FormControl>
                        <Input type="tel" id="phoneNumber" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {dataPut ? (
                <>
                  <Button type="submit">Save Changes</Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </>
              ) : (
                ""
              )}
            </CardFooter>
          </form>
        </Form>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Security Check</DialogTitle>
              <DialogDescription>
                Please confirm your password to change your user data
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="confirmPass"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" onClick={handleFinalSubmit}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </FormProvider>
  );
}
