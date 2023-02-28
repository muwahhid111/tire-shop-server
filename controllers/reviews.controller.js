const Review = require("../models/Review.model");
const User = require("../models/User.model");

module.exports.reviewsController = {
  addReview: async (req, res) => {
    const { id } = req.user;
    const { textReview, productId } = req.body;
    console.log(textReview);
    try {
      const review = await Review.create({
        textReview,
        userId: id,
        productId,
      });
      const reviews = await Review.find({ productId: productId }).populate(
        "userId"
      );
      res.json(reviews);
    } catch (error) {
      res.json(error);
    }
  },
  getReviews: async (req, res) => {
    const { id } = req.params;
    try {
      const comments = await Review.find({ productId: id }).populate("userId");
      if (!comments) {
        return res.json({ error: "К этому товару пока что нет отзывов" });
      }
      res.json(comments);
    } catch (error) {
      res.json(error);
    }
  },
};
