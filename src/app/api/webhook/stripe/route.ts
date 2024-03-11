import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import { stripe } from "@/utils/stripeConfig";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const body = await req.text();

  const sig = req.headers.get("stripe-signature") as string;
  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endPointSecret);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Webhook error",
      error,
    });
  }

  if (event.type === "checkout.session.completed") {
    const { metadata } = event.data.object;
    const user = await User.findById(metadata?.userId).select([
      "_id",
      "subscription",
    ]);

    if (!user) {
      return NextResponse.json({
        message: "User not found!",
      });
    }

    if (metadata) {
      user.subscription = metadata?.plan;
      await user.save();
    }

    revalidatePath("/pricing");

    return NextResponse.json({
      message: "OK",
    });
  }

  return new Response("", { status: 200 });
}
