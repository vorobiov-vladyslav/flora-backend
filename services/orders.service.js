import { Order } from "../models/index.js";

export const createOrder = (data) => Order.create(data);
