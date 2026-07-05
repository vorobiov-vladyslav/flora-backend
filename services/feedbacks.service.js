import { Feedback } from "../models/index.js";

export const listFeedbacks = () => Feedback.findAll({ order: [["createdAt", "ASC"]] });

export const getFeedbackById = (id) => Feedback.findByPk(id);

export const createFeedback = (data) => Feedback.create(data);

export const updateFeedback = async (id, data) => {
  const feedback = await Feedback.findByPk(id);
  if (!feedback) {
    return null;
  }
  return feedback.update(data);
};

export const removeFeedback = async (id) => {
  const feedback = await Feedback.findByPk(id);
  if (!feedback) {
    return null;
  }
  await feedback.destroy();
  return feedback;
};
