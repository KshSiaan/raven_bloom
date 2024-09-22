import Navbar from "@/components/navbar";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type { Metadata } from "next";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "RavenBloom || Contact us",
  description: "Ravenbloom customer service",
};

export default function page() {
  return (
    <>
      <header className="pt-[48px]">
        <Navbar />
        <div className="p-4">
          <Breadcrumb>
            <BreadcrumbList className="text-xl">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Contact us</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="p-4">
        <h1 className="text-4xl font-semibold text-center italic">
          Customer Service
        </h1>
        <h4 className="text-2xl font-md text-center pt-4">
          At RavenBloom your satisfaction is our top priority
        </h4>
      </div>

      <div className="p-4 pt-8 grid grid-cols-2 gap-4">
        <div className="w-full h-auto border rounded-lg">
          <h2 className="text-3xl font-semibold p-4 px-6">Your order</h2>

          <div className="text-light px-6">
            <p className="underline">I have an issue with my order</p>

            <p className="py-4">
              To modify or cancel an order before it&apos;s delivered please
              contact us through the chat button at the bottom right or call our
              Customer Service team at 1 (123) 456-7890. We&apos;re here for you
              24 hours a day.
            </p>
            <hr />
          </div>
        </div>
        <div className="w-full border rounded-lg pb-4">
          <h2 className="text-3xl font-semibold p-4 px-6">Your Account</h2>

          <div className="text-light px-6 gap-y-4 grid grid-rows-3">
            <p className="underline">My account</p>
            <p className="underline">I forgot my password</p>
            <p className="underline">Manage email preferences</p>
            <hr />
          </div>
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

        <div className="p-4 w-full border rounded-lg">
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem value={"value" + index.toString()} key={index}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.para}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className="p-4">
        <h1 className="font-bold text-4xl">Additional Questions</h1>

        <p className="py-8">
          Our Customer Service is available 24/7. You may call 1 (800) 580-2913
          or chat with a live agent by clicking the ‘chat’ icon in the lower
          right-hand corner of your screen
        </p>
      </div>

      <Footer />
    </>
  );
}

const faqItems = [
  {
    title: "Inclement Weather Deliveries",
    para: `Our delivery partners may contact the recipient to advise them
                that their gift is on the way. They may reschedule delivery if
                the product cannot be left in a safe location due to severe
                weather conditions.
                If your order is being delivered via national carrier (UPS,
                FedEx), please track your order through the link in your
                shipment confirmation email. The carrier will have the most
                up-to-date delivery status.
                Our flowers are packed to withstand a long transit so they
                arrive in great condition even with a 1-2 day delay. Of course,
                they’ll need water and care according to the instructions packed
                with them. Within a few hours to a couple days, your flowers
                should be looking vibrant and cheerful.`,
  },
  {
    title: "Payment Options And Fees",
    para: `What do the delivery and handling fees cover?

Our delivery and handling fees cover all costs associated with the delivery and servicing of your gift. It also covers our “Love it or We’ll Make it Right Promise” and our “7 Day Freshness Guarantee”.

How do I request tax exemption?

 If you are a tax exempt organization, please fax the necessary documents to our Finance team at 630-724-6019 ATTN: Emily. If you do not have access to a fax machine, please call or email us.

How do I apply my Groupon or gift card?

Select desired item(s), options, and date. Click "Checkout". On the Payment or Delivery page, enter your 16 digit code in the “Promo or gift card” field and click “Apply”. Complete your information and Place Your Order.`,
  },

  {
    title: "Policies",
    para: `Delivery Policy

View the Proflowers Delivery Policy.

My order doesn’t look like the photo.

Our partners fill each order according to a recipe and make their arrangements as similar as possible, with respect to our substitution policy. However, there are times when further substitutions are required in order to ensure the timely delivery of your gift.

If, for some reason, you or your recipient are not satisfied with the quality of your arrangement, please reach out to us so that we can schedule a fresh re-delivery or full refund.

Anonymous Flower Delivery

If there is no signature on the gift message, the sender may have accidentally left the card unsigned or they may have wanted to remain anonymous. As per our company policy, we do not release our customer's information without their consent. Please contact us and we will reach out to the sender to request the release of their information. `,
  },

  {
    title: "Deliveries",
    para: `How can I track my order?

To track your order, please use the Track your Order form. From there, you will be prompted to enter your order number and the last name of your recipient.

If you do not know your order number, please check your email inbox from the order confirmation message that we sent when your order was placed. You can also find this information by signing into your account and accessing your order history.

If you require additional assistance, please contact a member of our team. Please note that real-time tracking is unavailable for florist deliveries during peak holiday weeks.

Inclement weather deliveries

Our delivery partners may contact the recipient to advise them that their gift is on the way. They may reschedule delivery if the product cannot be left in a safe location due to severe weather conditions.

If your order is being delivered via national carrier (UPS, FedEx), please track your order through the link in your shipment confirmation email. The carrier will have the most up-to-date delivery status.

Our flowers are packed to withstand a long transit so they arrive in great condition even with a 1-2 day delay. Of course, they’ll need water and care according to the instructions packed with them. Within a few hours to a couple days, your flowers should be looking vibrant and cheerful.

What time will my order be delivered?

For businesses, our partner florists will delivery any time between 9 AM and 6 PM. For residences, they will deliver between 9 AM and 8 PM (up to 9 PM on holidays). We will email you a confirmation as soon as the delivery is made.

Unfortunately, we are unable to guarantee specific delivery times. This is because our partners deliver to funerals first, then hospitals, then businesses, and lastly residences. If you have a specific time constraint, please reach out to us so that we can make a request or assist with other accommodations.

I received a delivery confirmation email, but my order has not arrived yet.

When our partner florists and vendors deliver your gift, they notify us via a message in our system, which then automatically sends a delivery confirmation email to you.

If you, for some reason, received a confirmation email, but the gift was not received, do not panic! If it is still the scheduled delivery date, it is possible that the florist has just left the shop and will deliver your gift as scheduled.

However, if you received this notification on any date other than your selected delivery date, please contact us as soon as possible so that we can investigate further and ensure that there are no complications.

My order was not delivered.

Please advise that the delivery window for residences is from 9 AM to 8 PM. During peak holiday weeks, deliveries may occur until 9 PM.

If the delivery date has already passed, please contact a member of our team so that we can make things right.`,
  },

  {
    title: "What If I’m Not Satisfied With My Order?",
    para: `Your perishable flowers and plants are guaranteed to last seven days. If, for any reason, you are not satisfied with your delivery, please contact us within that timeframe, and we will make it right.`,
  },
  {
    title: "Important Warnings",
    para: `Not Fit For Consumption – Flowers and Plants are not fit for consumption. Please keep them out of reach of children or animals.

Choking Hazard – Children under 12 years can choke or suffocate on uninflated or broken balloons. Adult supervision required. Keep uninflated balloons from children. Discard broken balloons at once.

Choking Hazard – Small parts not for children under 3 years testing.`,
  },
];
