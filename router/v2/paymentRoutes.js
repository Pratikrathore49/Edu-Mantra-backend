import express from 'express';
import { checkPurchase, createOrder, verifyPayment } from '../../controllers/paymentController.js';
import { isLoggedIn } from '../../middleware/middleware.js';

const router = express.Router();

router.post('/create-order',isLoggedIn,createOrder)
router.post('/verify-payment',isLoggedIn, verifyPayment)


export default router;