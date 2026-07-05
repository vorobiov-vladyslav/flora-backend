import * as feedbacksService from "../services/feedbacks.service.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";

const getAll = async (req, res) => {
  const feedbacks = await feedbacksService.listFeedbacks();
  res.json(feedbacks);
};

const getById = async (req, res) => {
  const feedback = await feedbacksService.getFeedbackById(req.params.id);
  if (!feedback) {
    throw HttpError(404, "Not found");
  }
  res.json(feedback);
};

const add = async (req, res) => {
  const feedback = await feedbacksService.createFeedback(req.body);
  res.status(201).json(feedback);
};

const updateById = async (req, res) => {
  const feedback = await feedbacksService.updateFeedback(req.params.id, req.body);
  if (!feedback) {
    throw HttpError(404, "Not found");
  }
  res.json(feedback);
};

const deleteById = async (req, res) => {
  const feedback = await feedbacksService.removeFeedback(req.params.id);
  if (!feedback) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Deleted" });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
