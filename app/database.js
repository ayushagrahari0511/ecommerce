const mongoose = require('mongoose')

const DbConnect = () => {
    mongoose.connect(process.env.DB_URL,  {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database Connection successful')
    }).catch((e) => {
        console.log('Database Connection failed')
    })
}

module.exports = DbConnect