const { DateTime } = require("luxon");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    order_items: [
      {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "Order-Item",
      },
    ],
    total_products: Number,
    total_price: Number,
    total_quantity: Number,
  },
  {
    timestamps: true,
    id: true,
  }
);

OrderSchema.virtual("date").get(function () {
  return DateTime.fromJSDate(this.createdAt).toFormat("MM-dd-yyyy");
});

module.exports = mongoose.model("Order", OrderSchema);
