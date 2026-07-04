import { Router } from "express";
import bouquetsController from "../controllers/bouquets.controller.js";
import { validateBody, isValidId, upload } from "../middlewares/index.js";
import {
  bouquetCreateSchema,
  bouquetUpdateSchema,
  bouquetFavoriteSchema,
} from "../schemas/bouquet.schemas.js";

const router = Router();

/**
 * @swagger
 * /api/bouquets:
 *   get:
 *     summary: List bouquets
 *     tags: [Bouquets]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *         description: Page number (used with limit for pagination)
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *         description: Items per page
 *       - in: query
 *         name: category
 *         schema: { type: string, enum: [roses, mixed, seasonal, premium] }
 *         description: Filter by category
 *       - in: query
 *         name: favorite
 *         schema: { type: boolean }
 *         description: Filter by favorite flag
 *     responses:
 *       200:
 *         description: Array of bouquets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bouquet'
 */
router.get("/", bouquetsController.getAll);

/**
 * @swagger
 * /api/bouquets/{id}:
 *   get:
 *     summary: Get one bouquet by id
 *     tags: [Bouquets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: The bouquet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bouquet'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", isValidId, bouquetsController.getById);

/**
 * @swagger
 * /api/bouquets:
 *   post:
 *     summary: Create a bouquet
 *     tags: [Bouquets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BouquetCreate'
 *     responses:
 *       201:
 *         description: Created bouquet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bouquet'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", validateBody(bouquetCreateSchema), bouquetsController.add);

/**
 * @swagger
 * /api/bouquets/{id}:
 *   put:
 *     summary: Update a bouquet
 *     tags: [Bouquets]
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
 *             $ref: '#/components/schemas/BouquetUpdate'
 *     responses:
 *       200:
 *         description: Updated bouquet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bouquet'
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
router.put("/:id", isValidId, validateBody(bouquetUpdateSchema), bouquetsController.updateById);

/**
 * @swagger
 * /api/bouquets/{id}:
 *   delete:
 *     summary: Delete a bouquet
 *     tags: [Bouquets]
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
router.delete("/:id", isValidId, bouquetsController.deleteById);

/**
 * @swagger
 * /api/bouquets/{id}/favorite:
 *   patch:
 *     summary: Update the favorite status of a bouquet
 *     tags: [Bouquets]
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
 *             $ref: '#/components/schemas/BouquetFavorite'
 *     responses:
 *       200:
 *         description: Updated bouquet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bouquet'
 *       400:
 *         description: Validation error
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
router.patch("/:id/favorite", isValidId, validateBody(bouquetFavoriteSchema), bouquetsController.updateFavorite);

/**
 * @swagger
 * /api/bouquets/{id}/photo:
 *   patch:
 *     summary: Upload or replace a bouquet photo
 *     tags: [Bouquets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: New photo URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 photoURL: { type: string }
 *       400:
 *         description: Missing or invalid image file
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
router.patch("/:id/photo", isValidId, upload.single("photo"), bouquetsController.updatePhoto);

export default router;
