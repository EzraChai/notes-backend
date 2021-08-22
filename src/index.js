const express = require('express');
const router = require('../router')
const morgan = require('morgan');
const cors = require('cors');
const ErrorHandler = require('../middleware/error-handler')
const compression = require('compression');
const serverless = require('serverless-http')

require('../model')

const app = express();
app.use(compression())


app.use(morgan('dev'));
app.use(express.json());

//Access-Control-Allow-Origin: *
app.use(cors());


app.use('/.netlify/functions/api',router)


//挂载统一处理服务端错误中间件
app.use(ErrorHandler())

module.exports.handler = serverless(app)