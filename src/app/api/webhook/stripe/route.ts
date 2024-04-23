import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import { stripe } from "@/utils/stripeConfig";
import { revalidatePath } from "next/cache";
import environments from "../../../../../environments/environments";

// Listen to the stripe event
export async function POST(req: Request) {
  const body = await req.text();

  const sig = req.headers.get("stripe-signature") as string;
  const endPointSecret = environments.STRIPE_WEBHOOK_SECRET!;

  try {
    let event = stripe.webhooks.constructEvent(body, sig, endPointSecret);

    if (!event) {
      throw new Error("An error occured when creating event!");
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

      // return NextResponse.json({
      //   message: "OK",
      // });

      return new Response("OK", {
        status: 200,
      });
    }

    throw new Error("An error occured on stripe");
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Webhook error",
      error,
    });
  }
}
