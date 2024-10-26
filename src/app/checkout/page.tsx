"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useEffect, useState } from "react";
import Cartinfo from "./cart-info";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCheckout } from "./checkoutContext";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Please use a valid email" }),
  firstName: z.string({ required_error: "Please put your first name" }),
  lastName: z.string({ required_error: "Please put your last name" }),
  phone: z.string({ required_error: "Please put senders phone number" }),
  locationType: z.string({ required_error: "Plase put a location" }),
  address: z.string({ required_error: "Delivery address is a must" }),
  city: z.string({ required_error: "City location is a must" }),
  state: z.string({ required_error: "State is must" }),
  zip: z.string().max(8).optional(),
  country: z.string({ required_error: "Please put a country" }),
  del_phone: z.string({
    required_error:
      "A delivery phone number is required to proceed with the delivery.",
  }),
  occasion: z.string().optional(),
  message: z
    .string()
    .max(300, { message: "Max characters length is 300" })
    .optional(),
});

export default function Page() {
  const { checkoutInfo, setCheckoutInfo } = useCheckout();

  const inventory = useAppSelector((state) => state.inventory.inventory);
  const [isClient, setIsClient] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);

  //Form Input takes

  useEffect(() => {
    setIsClient(true);
    const totalAmount = inventory.reduce(
      (acc, element) => acc + element.ammount,
      0
    );
    setTotal(totalAmount);

    //subtotal amount

    const subTotalVar = inventory.reduce(
      (acc, element) => acc + element.price,
      0
    );
    setSubtotal(subTotalVar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("Updated checkoutInfo:", checkoutInfo);
  }, [checkoutInfo]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "test@example.com",
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      locationType: "Residence",
      address: "123 Flower St",
      city: "Floraville",
      state: "GardenState",
      zip: "12345",
      country: "Bangladesh",
      del_phone: "0987654321",
      occasion: "Birthday",
      message: "Happy Birthday! Hope you have a blooming day!",
    },
  });

  const router = useRouter();

  function submitter(data: z.infer<typeof formSchema>) {
    setCheckoutInfo(data);
    router.push("/checkout/payment");
  }

  return (
    <>
      <Form {...form}>
        <form
          className="grid grid-cols-6 gap-x-4 items-start auto-rows-auto"
          onSubmit={form.handleSubmit(submitter)}
        >
          <div className="col-span-4 w-full border rounded-sm p-4">
            <h3 className="font-bold text-2xl mb-4">Your Email Address</h3>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full grid grid-cols-2 gap-6">
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="h-[40px]" />

            <h3 className="font-bold text-3xl pb-4">Contact Info</h3>
            <div className="grid grid-cols-6 gap-6 mt-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Input type="text" placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Input type="text" placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationType"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange} // Handle value change
                        value={field.value} // Bind the value
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Location Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residence">Residence</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="funeral_home">
                            Funeral Home
                          </SelectItem>
                          <SelectItem value="church">Church</SelectItem>
                          <SelectItem value="hospital">Hospital</SelectItem>
                          <SelectItem value="school">School</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.locationType?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Delivery Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input type="text" placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input type="text" placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input type="number" placeholder="Zip Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange} // Handle value change
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bangladesh">Bangladesh</SelectItem>
                          <SelectItem value="japan">Japan</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="del_phone"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Delivery Phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm font-light w-full py-4 px-2">
                      *Delivery phone number helps our florist partners and
                      delivery drivers successfully deliver your gift.
                    </p>
                  </FormItem>
                )}
              />
            </div>

            <h3 className="font-bold text-2xl my-6">Message & Signature</h3>

            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem className="col-span-6 mb-6">
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange} // Handle value change
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an Occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="just_because">
                          Just Because
                        </SelectItem>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="funeral">Funeral</SelectItem>
                        <SelectItem value="graduation">Graduation</SelectItem>
                        <SelectItem value="valentines_day">
                          Valentine&apos;s Day
                        </SelectItem>
                        <SelectItem value="mother's_day">
                          Mother&apos;s Day
                        </SelectItem>
                        <SelectItem value="get_well_soon">
                          Get Well Soon
                        </SelectItem>
                        <SelectItem value="thank_you">Thank You</SelectItem>
                        <SelectItem value="congratulations">
                          Congratulations
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="w-full resize-x-none col-span-1"
                      rows={8}
                      maxLength={230}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Cartinfo
            isClient={isClient}
            inventory={inventory}
            total={total}
            subtotal={subtotal}
          />

          <div className="col-span-6 w-full flex flex-row flex-wrap justify-center items-center py-4">
            <Button className="w-min mx-auto" size="default" type="submit">
              Continue to Payment
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
