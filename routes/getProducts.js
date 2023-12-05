const express = require("express");
const router = express.Router();
const ProductModel = require("../model/products");
const userModel = require("../model/user");
const response = require("../helpers/response");
const authMiddleware = require("../middleware/authMiddleware");

//products get route
router.get("/allProducts", async (req, res) => {
  try {
    const page = req.query.page || 0;
    const limit = 20;
    const products = await ProductModel.find()
      .skip(page * limit)
      .limit(limit);
    response(res, 200, "products fetched", products, false);
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "no product found",
    });
    response(res, 404, "no products found", null, true);
  }
});

// get product by id
router.get("/productById/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    response(res, 200, "product fetched", product, false);
  } catch (error) {
    response(res, 404, "no product found", null, true);
  }
});

// get product by status
router.get("/productByStatus", async (req, res) => {
  try {
    let status;
    if (
      req.query.status === "trending" ||
      req.query.status === "featured" ||
      req.query.status === "latest"
    ) {
      status = req.query.status;
    } else {
      status = "trending";
    }
    const products = await ProductModel.find({ status: status });
    response(res, 200, "products fetched", products, false);
  } catch (error) {
    response(res, 404, "no product found", null, true);
  }
});

// get product categories
router.get("/getCategories", async (req, res) => {
  try {
    const products = await ProductModel.find();
    if (!products.length > 0) {
      return response(res, 404, "No categories", [], true);
    } else {
      let categories = [];
      for (let i in products) {
        if (!categories.includes(products[i].category)) {
          categories.push(products[i].category);
        }
      }
      response(res, 200, "categories fetched", categories, false);
    }
  } catch (error) {
    response(res, 404, "no product found", null, true);
  }
});

// get product by category
router.get("/productsByCategory", async (req, res) => {
  try {
    const category = req.query.c;
    const products = await ProductModel.find({ category: category });
    response(res, 200, "categories fetched", products, false);
  } catch (error) {
    response(res, 404, "no product found", null, true);
  }
});

// create product
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const product = await ProductModel.create({ ...body });
    res.status(200).send({
      status: 200,
      message: "product added",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "no product added",
    });
  }
});

// product delete route
router.delete("/", authMiddleware, async (req, res) => {
  try {
    const id = req.decodedToken?.id;
    if (id) {
      const user = await userModel.findById(id);
      if (user.type === "admin") {
        const product = await ProductModel.findByIdAndDelete(req.query.id);
        if (product) {
          return response(res, 200, "order deleted", null, false);
        }
        throw Error("order not deleted server error");
      }
      throw Error(
        "permission denied you don't have access of this type of data"
      );
    }
    throw Error("token not provided");
  } catch (error) {
    response(res, 401, error.message, null, true);
  }
});

// products edit route
router.put("/", authMiddleware, async (req, res) => {
  try {
    const id = req.decodedToken?.id;
    if (id) {
      const user = await userModel.findById(id);
      if (user.type === "admin") {
        const order = await ProductModel.findByIdAndUpdate(req.query.id, {
          ...req.body,
        });
        if (order) {
          return response(res, 200, "product updated", null, false);
        }
        throw Error("product not updated server error");
      }
      throw Error(
        "permission denied you don't have access of this type of data"
      );
    }
    throw Error("token not provided");
  } catch (error) {
    response(res, 401, error.message, null, true);
  }
});

module.exports = router;
