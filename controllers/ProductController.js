// const db = require("../models")
const { ProductModel } = require("../models")
const catchAsyncError = require('../middleware/catchAsyncError')


//to get all products
exports.gelAllProducts = catchAsyncError(async (req, res, next) => {
    // res.status(200).json({ message: "route is working bro" })
    await ProductModel.findAll().then(product => {
        let productData = product
        res.send(productData)
    })
})


//to get single product
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
    const product = await ProductModel.findOne({ where: { id: req.params.id } });

    if (!product) {
        return res.status(404).json({ message: "Product not found" })
    }
    res.send(product)

})


//to create a product
exports.addProduct = catchAsyncError(async (req, res, next) => {
    await ProductModel.create(req.body);
    await res.send("inserted successfully")
});



//to update a product

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    const product = await ProductModel.findOne({ where: { id: req.params.id } });

    if (!product) {
        return res.status(500).json({ message: "Product not found" })
    }
    await product.update(req.body)
    await res.send("updated successfully")
})


//to delete a product

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await ProductModel.findOne({ where: { id: req.params.id } });

    if (!product) {
        return res.status(500).json({ message: "Product not found" })
    }
    await product.destroy();
    await res.send("deleted successfully")
})




//product properties

// name: "T-Shirt",
// descreption: "Cool Shirt",
// brand: "E-Store Originals",
// price: 199,
// category: "T-Shirt",
// stock: 10,