const mongoose = require('mongoose')

const connnectDb = () => {
    mongoose.connect(process.env.DBHOST, { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
        console.log(`mongodb connected with server: ${data.connection.host}`);
    }).catch((error) => { console.log(error) })
}

module.exports = connnectDb