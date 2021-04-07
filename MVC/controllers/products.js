const { validationResult } = require("express-validator");

const mongodb = require("mongodb");
const Product = require("../models/products");
const ObjectId = mongodb.ObjectId;

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("products/index", {
        pageTitle: "Product",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getSearchProduct = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("products/search", {
        pageTitle: "Serach Product",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddProduct = (req, res, next) => {
  const photo = "";
  const product_name = "";
  const price = "";
  const detail = "";
  const catagory = "";
  const total = "";
  res.render("products/insert", {
    pageTitle: "Insert Product",
    errorMessage: null,
    photo: photo,
    product_name: product_name,
    price: price,
    detail: detail,
    catagory: catagory,
    total: total,
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  const { photo, product_name, price, detail, catagory, total } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("products/insert", {
      pageTitle: "Insert Product",
      errorMessage: errors.array(),
      photo: photo,
      product_name: product_name,
      price: price,
      detail: detail,
      catagory: catagory,
      total: total,
    });
  }

  const product = new Product(
    photo,
    product_name,
    price,
    detail,
    catagory,
    total
  );
  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("/insert");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUpdateProduct = (req, res, next) => {
  console.log(req.params);
  const { product_id } = req.params;
  let product_name = "";
  let price = "";
  let _photo = "";
  let detail = "";
  let catagory = "";
  let total = "";
  Product.findById(product_id)
    .then((product) => {
      console.log(product);
      product_name = product.product_name;
      price = product.price;
      _photo = product._photo;
      detail = product.detail;
      catagory = product.catagory;
      total = product.total;
      res.render("products/update", {
        pageTitle: "Update Product",
        errorMessage: null,
        product_id: product_id,
        product_name: product_name,
        catagory: catagory,
        price: price,
        _photo: _photo,
        detail: detail,
        total: total,
      });
    })
    .catch((err) => console.log(err));
};

exports.postUpdateProduct = (req, res, next) => {
  console.log(req.body);
  const { product_id, product_name, price } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("products/update", {
      pageTitle: "Update Product",
      errorMessage: errors.array(),
      product_id: product_id,
      product_name: product_name,
      price: price,
    });
  }

  const product = new Product(product_name, price, new ObjectId(product_id));
  product
    .save()
    .then((result) => {
      console.log("Update Product");
      res.redirect("/products");
    })
    .catch((err) => console.log(err));
};

exports.getDeleteProduct = (req, res, next) => {
  const { product_id } = req.params;
  console.log(product_id);
  Product.deleteById(product_id)
    .then(() => {
      console.log("Delete Product");
      res.redirect("/products");
    })
    .catch((err) => console.log(err));
};
