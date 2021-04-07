const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors');
require('dotenv').config({ path: './.env' })
require('./config/db')

const userRouter = require('./routes/user')
const sellerRouter = require('./routes/seller')
const adminRouter = require('./routes/admin')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const adsRouter = require('./routes/ads')
const orderRouter = require('./routes/orderRouter')
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,auth-token"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "*"
    );
    next();
});
// app.use(cors())
app.use(express.urlencoded({ extended: true ,limit:'50mb'}))
app.use(express.json())

app.use('/user', userRouter)
app.use("/seller", sellerRouter);
app.use("/admin", adminRouter);
app.use("/ads", adsRouter);
app.use("/category", categoryRouter)
app.use('/product', productRouter);
app.use('/ads', adsRouter);
app.use('/order', orderRouter);

const port = process.env.PORT || 4000
app.listen(port, () => console.log('server run'+port))