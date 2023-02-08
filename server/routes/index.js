var express = require("express");
var router = express.Router();

const product_services = require("../services/product");
const cart_services = require("../services/cart");
const order_services = require("../services/order");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("This is the index of retrofit server!");
});

// product services
router.post("/products/create", product_services.new_products);
router.get("/product/:id", product_services.detail);
router.get("/products", product_services.list);

// cart services
router.post("/cart/add/:product_id", cart_services.add_cart);
router.post("/cart/update/:id", cart_services.update_quantity);
router.post("/cart/remove/:id", cart_services.remove_cart);
router.get("/carts/total", cart_services.total);
router.get("/carts", cart_services.list);

// order services
router.post("/order/create", order_services.create);
router.get("/orders", order_services.list);

module.exports = router;
