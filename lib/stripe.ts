import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_mock_stripe_secret_key_placeholder";

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-04-10" as any,
});
