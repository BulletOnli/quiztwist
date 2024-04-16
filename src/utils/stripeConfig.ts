import Stripe from "stripe";
import environments from "./environments";

export const stripe = new Stripe(environments.STRIPE_SECRET_KEY!);
