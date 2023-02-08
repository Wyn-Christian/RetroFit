const Decimal = require("decimal.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Product",
    },
    price: {
      type: Number,
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

OrderItemSchema.virtual("total_price").get(function () {
  return new Decimal(this.price).mul(this.quantity).toFixed(2);
});

module.exports = mongoose.model("Order-Item", OrderItemSchema);
