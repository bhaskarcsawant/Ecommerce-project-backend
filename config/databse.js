const mongoose = require('mongoose')

// DBHOST = "mongodb://0.0.0.0:27017/estore";
const connnectDb = () => {
    mongoose.connect(process.env.DBHOST, { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
        console.log(`mongodb connected with server: ${data.connection.host}`);
    }).catch((error) => { console.log(error) })
}

module.exports = connnectDb