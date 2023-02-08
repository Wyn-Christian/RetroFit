const Product = require("../models/product");

exports.list = async (req, res, next) => {
  let products = await Product.find();
  res.json(products);
};

exports.detail = async (req, res, next) => {
  let product_detail = await Product.findById(req.params.id);
  res.json(product_detail);
};

exports.new_product = async (req, res, next) => {
  const new_product = new Product({
    ...req.body,
  });

  new_product.save((err) => {
    if (err) {
      return next(err);
    }

    res.json(new_product);
    return;
  });
};

exports.new_products = async (req, res, next) => {
  let data = await Product.insertMany(req.body);

  res.json(data);
};

exports.update_product = async (req, res, next) => {
  const product = {
    ...req.body,
  };

  let updated_product = await Product.findByIdAndUpdate(
    req.params.id,
    product,
    {
      new: true,
    }
  );
  res.json(updated_product);
};

exports.delete_product = async (req, res, next) => {
  let data = await Product.findByIdAndDelete(req.params.id);
  res.json(data);
};
