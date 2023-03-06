import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${process.env.NEXT_URL}/`;
  const { priceId } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Methodo não suportado necessário usar POST",
    });
  }
  console.log("Price ID:", priceId);
  if (!priceId) {
    return res.status(400).json({
      error: "necessário o parâmetro priceId",
    });
  }
  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancel_url,
    success_url: success_url,
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price: priceId,
      },
    ],
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
