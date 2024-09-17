const mongoose = require("mongoose");
const {productSchema} = require("./Product");

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    customerEmail: {
          type: String,
    },
    customerPhone: {
          type: String,
          required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
    customerAddress: {
        type: String,
        required: true,
    },
   products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true,
        },
       price: {
           type: Number,
           required: true,
       },
       productName: {
           type: String,
           required: true
       }
   }],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
