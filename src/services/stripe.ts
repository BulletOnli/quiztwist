"use server";
import { stripe } from "@/app/api/webhook/stripe/route";
import { redirect } from "next/navigation";

type CheckoutDetails = {
  plan: string;
  price: number;
  userId: string;
};

export const stripeCheckout = async (transDetails: CheckoutDetails) => {
  const amount = Number(transDetails.price) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: transDetails.plan,
          },
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transDetails.plan.toLowerCase(),
      userId: transDetails.userId,
    },
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/pricing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/pricing?canceled=true`,
  });

  redirect(session.url!);
};
