const express = require("express");
const router = express.Router();
const OrderModel = require("../model/orders");
const userModel = require("../model/user");
const response = require("../helpers/response");
const authMiddleware = require("../middleware/authMiddleware");

//error handler
const errorHandle = (error) => {
  if (error.message.includes("orders validation failed")) {
    let errors = { userId: "", products: "" };
    Object.values(error?.errors).forEach((data) => {
      errors[data.path] = data.message;
    });
    return errors;
  }

  if (error.message === "order not placed") {
    return "order not placed internal server error";
  }
};

// order get route
router.get("/", authMiddleware, async (req, res) => {
  try {
    const id = req.decodedToken?.id;
    if (id) {
      const user = await userModel.findById(id);
      if (user.type === "admin") {
        const orders = await OrderModel.find().populate({
          path: "users",
          select: "name email address",
        });
        if (orders) {
          return response(res, 200, "orders fetched", orders, false);
        }
        throw Error("no orders found");
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

// orders edit route
router.put("/", authMiddleware, async (req, res) => {
  try {
    const id = req.decodedToken?.id;
    if (id) {
      const user = await userModel.findById(id);
      if (user.type === "admin") {
        const order = await OrderModel.findByIdAndUpdate(req.query.id, {
          ...req.body,
        });
        if (order) {
          return response(res, 200, "order updated", null, false);
        }
        throw Error("order not updated server error");
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

// order delete route
router.delete("/", authMiddleware, async (req, res) => {
  try {
    const id = req.decodedToken?.id;
    if (id) {
      const user = await userModel.findById(id);
      if (user.type === "admin") {
        const order = await OrderModel.findByIdAndDelete(req.query.id);
        if (order) {
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

// create order
router.post("/", async (req, res) => {
  try {
    let orderData = req.body;
    const order = await OrderModel.create({ ...orderData });
    if (order) {
      return response(res, 201, "Order placed!", null, false);
    }
    throw Error("order not placed");
  } catch (error) {
    const err = errorHandle(error);
    response(res, 401, err, null, true);
  }
});

module.exports = router;
