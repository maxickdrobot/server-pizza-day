const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
    {
        items: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Pizza",
                required: true,
            },
        ],
        total: {
            type: Number,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        delivery_address: {
            city: { type: String },
            country: { type: String },
        },
        discountApplied: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

ordersSchema.index({ user_id: 1 });

ordersSchema.index({ createdAt: 1 }, { expireAfterSeconds: 15552000 });

module.exports = mongoose.model("Order", ordersSchema, "orders");
