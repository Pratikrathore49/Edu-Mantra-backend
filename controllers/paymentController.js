import Razorpay from "razorpay";
import crypto from "crypto";
import PaymentModel from "../models/PaymentModel.js";
export const createOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // ✅ Save order in DB
    await PaymentModel.create({
      userId: req.user._id,
      amount: req.body.amount,
      orderId: order.id,
      status: "pending",
    });

    return res.json(order);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Unable to create order" });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.json({ status: "failed" });
    }

    // ✅ Update the existing pending order
    await PaymentModel.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: "success",
      }
    );

    return res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Verification error" });
  }
};

export const checkPurchase = async (req, res) => {
  const hasPaid = await PaymentModel.findOne({
    userId: req.user._id,
    status: "success",
  });

  if (hasPaid) {
    return res.json({ access: true });
  } else {
    return res.json({ access: false });
  }
};
