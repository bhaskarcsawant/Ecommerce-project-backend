
const Product = require("../models/ProductModel")
const catchAsyncError = require('../middleware/catchAsyncError')
const ApiFeatures = require("../utils/apiFeatures")
const cloudinary = require("cloudinary");


//to get all products
exports.gelAllProducts = catchAsyncError(async (req, res, next) => {
    // let resultPerPage = await req.query.productperpage;
    let resultPerPage = 9;

    let productCount = await Product.countDocuments()
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query.then(product => {
        res.status(200).json({
            productCount,
            product
        })
    })
})

//to get all products
exports.gelAllAdminProducts = catchAsyncError(async (req, res, next) => {
    // let resultPerPage = await req.query.productperpage;

    let productCount = await Product.countDocuments()
    const products = await Product.find()
  
    res.status(200).json({
        productCount,
        products
    })

})


//to get single product
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({ message: "Product not found" })
    }
    res.send(product)

})


//to create a product
exports.addProduct = catchAsyncError(async (req, res, next) => {
    const imagesLinks = [];

    for (let i = 0; i < req.body.images.length; i++) {
        console.log(req.body.images);
        const result = await cloudinary.v2.uploader.upload(req.body.images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id
    await Product.create(req.body);
    res.send("inserted successfully")
});



//to update a product

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({ message: "Product not found" })
    }
    await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.send("updated successfully")
})


//to delete a product

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({ message: "Product not found" })
    }
    await product.deleteOne();
    res.send("deleted successfully")
})




//product properties

// name: "T-Shirt",
// descreption: "Cool Shirt",
// brand: "E-Store Originals",
// price: 199,
// category: "T-Shirt",
// stock: 10,