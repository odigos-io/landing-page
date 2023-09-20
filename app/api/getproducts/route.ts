import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15",
  });

  const prices = await stripe.prices.list({
    limit: 3,
  });

  return NextResponse.json(prices.data);
}
