const crypto = require('crypto');

exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: 'INR',
            receipt: `order_rcpt_${Date.now()}`,
        });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Verify Payment Signature
exports.verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

    if (generatedSignature === razorpay_signature) {
        // Save to DB if needed
        return res.status(200).json({ success: true, message: 'Payment verified' });
    } else {
        return res.status(400).json({ success: false, message: 'Invalid signature' });
    }
};