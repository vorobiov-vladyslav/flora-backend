import { Router } from "express";
import feedbacksController from "../controllers/feedbacks.controller.js";
import { validateBody, isValidId } from "../middlewares/index.js";
import { feedbackCreateSchema, feedbackUpdateSchema } from "../schemas/feedback.schemas.js";

const router = Router();

/**
 * @swagger
 * /api/feedbacks:
 *   get:
 *     summary: List client feedbacks
 *     tags: [Feedbacks]
 *     responses:
 *       200:
 *         description: Array of feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feedback'
 */
router.get("/", feedbacksController.getAll);

/**
 * @swagger
 * /api/feedbacks/{id}:
 *   get:
 *     summary: Get one feedback by id
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: The feedback
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", isValidId, feedbacksController.getById);

/**
 * @swagger
 * /api/feedbacks:
 *   post:
 *     summary: Create a feedback
 *     tags: [Feedbacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackCreate'
 *     responses:
 *       201:
 *         description: Created feedback
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", validateBody(feedbackCreateSchema), feedbacksController.add);

/**
 * @swagger
 * /api/feedbacks/{id}:
 *   put:
 *     summary: Update a feedback
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackUpdate'
 *     responses:
 *       200:
 *         description: Updated feedback
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       400:
 *         description: Empty body or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", isValidId, validateBody(feedbackUpdateSchema), feedbacksController.updateById);

/**
 * @swagger
 * /api/feedbacks/{id}:
 *   delete:
 *     summary: Delete a feedback
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: Deleted }
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", isValidId, feedbacksController.deleteById);

export default router;
