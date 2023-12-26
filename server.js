var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
app.use(express.json());
app.use(express.static('public'));

const backtest = require('./routes/backtest')
app.use('/backtest/', backtest)

const backtestdata = require('./routes/backtestdata')
app.use('/backtestdata/', backtestdata)

const livetrade = require('./routes/livetrade')
app.use('/livetrade', livetrade)

const livetradedata = require('./routes/livetradedata')
app.use('/livetradedata/', livetradedata)

const auth = require('./routes/auth')
app.use('/auth/', auth)


app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})