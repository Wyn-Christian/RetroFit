const Order = require("../models/order");
const Order_Item = require("../models/order-item");
const Cart = require("../models/cart");

exports.list = (req, res, next) => {
  Order.find()
    .populate({
      path: "order_items",
      populate: {
        path: "product",
        model: "Product",
        select: "id name price",
      },
    })

    .exec((err, result) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(result);
    });
};

exports.create = (req, res, next) => {
  let { order_items, total } = req.body;

  const new_order = new Order({
    order_items,
    total_products: total.total_products,
    total_price: total.total_price,
    total_quantity: total.total_quantity,
  });

  new_order.save(async (err) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    await Order_Item.insertMany(order_items);
    await Cart.deleteMany({});

    res.json(new_order);
    return;
  });
};
