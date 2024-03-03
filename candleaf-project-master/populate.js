require('dotenv').config()
const connectDB = require('./db/connect')
const Candleaf = require('./models/candleaf')
const jsonCandleafs = require('./candleafs.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Candleaf.deleteMany()
        await Candleaf.create(jsonCandleafs)
        console.log('Success!!!!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()
