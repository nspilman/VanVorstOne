import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";

export const config = { api: { bodyParser: false } };

export default async function webhookHandler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const stripe = new Stripe(
			process.env.STRIPE_SECRET_KEY || "",
			{ apiVersion: "2020-08-27" },
		);

		const webhooksSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;
		const sig = req.headers["stripe-signature"];
		const buf = await buffer(req);
		try {
			if (!sig || !webhooksSecret) {
				return;
			}
			const event = stripe.webhooks.constructEvent(buf, sig, webhooksSecret);
		} catch {
			return res.status(400).send("something went fuckywucky");
		}
		return res.status(200).send("We did it!");
	}
}
