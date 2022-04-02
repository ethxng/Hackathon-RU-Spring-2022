let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let itemSchema = new Schema({
    status: {type: String, enum: ['sold', 'available'], default: "available", required: true},
    item: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    negotiation: {type: Boolean, required: true},
    method_of_delivery: {type: String, enum: ['drop-off', 'delivery', 'pickup'], required: true},
    OP: {type: Schema.Types.ObjectId, ref: "User", required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model("Item", itemSchema);