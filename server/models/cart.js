const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Product",
    },
    price: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);
