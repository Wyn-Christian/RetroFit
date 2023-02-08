const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    category: {
      type: String,
      require: true,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    img_name: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

ProductSchema.virtual("img_url").get(function () {
  return `/images/products/${this.img_name}`;
});

module.exports = mongoose.model("Product", ProductSchema);
