import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./docs/swaggerDef.js";
import bouquetsRouter from "./routes/bouquets.routes.js";
import ordersRouter from "./routes/orders.routes.js";

const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.set("trust proxy", true);
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/bouquets", bouquetsRouter);
app.use("/api/orders", ordersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
