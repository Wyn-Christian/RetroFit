const Cart = require("../models/cart");

exports.list = (req, res, next) => {
  Cart.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: { path: "$product" } },
    {
      $set: {
        total_price: { $multiply: ["$price", "$quantity"] },
      },
    },
  ]).exec((err, carts) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(carts);
  });
};

exports.create_cart_item = async (req, res, next) => {
  const new_cart = new Cart({
    ...req.body,
  });

  new_cart.save((err) => {
    if (err) {
      return next(err);
    }
    res.json(new_cart);
    return;
  });
};

exports.add_cart = async (req, res, next) => {
  let cartItem = await Cart.find({ product: req.params.product_id });

  if (cartItem.length) {
    res.json({ status: "Product already in the cart!" });
    return;
  }
  const new_cart = new Cart({
    product: req.params.product_id,
    price: req.body.price,
  });

  new_cart.save((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    res.json({ status: "success", new_cart });
    return;
  });
};

exports.remove_cart = (req, res, next) => {
  Cart.findByIdAndDelete(req.params.id).exec((err, result) => {
    if (err) return next(result);

    // success
    res.json({ status: "Deletion Success" });
  });
};

exports.update_quantity = async (req, res, next) => {
  let updated_quantity = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      quantity: req.body.quantity,
    },
    { new: true }
  );
  res.json({ status: "Update quantity success!", updated_quantity });
};

exports.total = (req, res, next) => {
  Cart.aggregate([
    {
      $group: {
        _id: null,
        total_products: { $sum: 1 },
        total_price: { $sum: { $multiply: ["$price", "$quantity"] } },
        total_quantity: { $sum: "$quantity" },
      },
    },
  ]).exec((err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(result[0]);
  });
};
