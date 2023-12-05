const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        status: {type : mongoose.SchemaTypes.String, required: true},
        title: {type : mongoose.SchemaTypes.String, required: true},
        price: {type : mongoose.SchemaTypes.Number, required: true},
        description: {type : mongoose.SchemaTypes.String, required: true},
        category: {type : mongoose.SchemaTypes.String, required: true},
        image: {type : mongoose.SchemaTypes.String, required: true},
        rate: {type : mongoose.SchemaTypes.Number, required: true},
        count: {type : mongoose.SchemaTypes.Number, required: true}
    }
)

const products = mongoose.model('products', productSchema);

module.exports = products;