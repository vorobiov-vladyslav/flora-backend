import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";
import { validateBody } from "../middlewares/index.js";
import { orderCreateSchema } from "../schemas/order.schemas.js";

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Submit an order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderCreate'
 *     responses:
 *       201:
 *         description: Created order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", validateBody(orderCreateSchema), ordersController.add);

export default router;
