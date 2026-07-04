import * as ordersService from "../services/orders.service.js";
import { ctrlWrapper } from "../helpers/index.js";

const add = async (req, res) => {
  const order = await ordersService.createOrder(req.body);
  res.status(201).json(order);
};

export default {
  add: ctrlWrapper(add),
};
