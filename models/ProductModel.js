const mongoose = require('mongoose')


const productScema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
    },
    descreption: {
        type: String,
        required: [true, "Please enter product descreption"],
    },
    brand: {
        type: String,
        required: [true, "Please enter product brand"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Please enter product category"],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },

        },
    ],
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [10, "price cannot exceed 10 characters"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock quantity"],
        maxLength: [5, "price cannot exceed 5 characters"],
        default: 1,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})


module.exports = mongoose.model('Product', productScema)


//product properties json format

// {
// "name": "bokaShirt",
// "descreption": "Cool Shirt",
// "brand": "E-Store Originals",
// "price": 199,
// "images": [
// {
//     "public_id": "sample",
//     "url": "sample bro"
// },
// {
//     "public_id": "sample1",
//     "url": "sample bro1"
// }
// ],
// "category": "T-Shirt",
//     "stock": 10
// }