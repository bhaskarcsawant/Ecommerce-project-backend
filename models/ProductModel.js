module.exports = (sequelize, DataTypes) => {
    const ProductModel = sequelize.define('ProductModel', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        descreption: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        images: {
            type: DataTypes.STRING,
            get: function () {
                return JSON.parse(this.getDataValue('images'));
            },
            set: function (val) {
                return this.setDataValue('images', JSON.stringify(val));
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    })

    return ProductModel
}


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