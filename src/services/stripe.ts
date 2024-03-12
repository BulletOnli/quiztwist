"use server";
import { redirect } from "next/navigation";
import { stripe } from "@/utils/stripeConfig";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/authOptions";
import User from "@/lib/models/user.model";
import getErrorMessage from "@/utils/getErrorMessage";

type CheckoutDetails = {
  plan: string;
  price: number;
  userId: string;
};

export const stripeCheckout = async (transDetails: CheckoutDetails) => {
  try {
    const nextAuthSession = await getServerSession(authOptions);
    const user = await User.findById(nextAuthSession?.user.id)
      .select(["_id"])
      .lean();
    if (!user || !nextAuthSession) throw new Error("Please login first!");
  } catch (error) {
    console.log(getErrorMessage(error));
    redirect("/login");
  }

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
