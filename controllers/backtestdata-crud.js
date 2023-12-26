const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tradingserver'
});

const multer = require('multer')
const path = require('path')

const createData = (req, res) => {
    const id_backtestport = JSON.parse(req.body.id_backtestport)
    const symbol = req.body.symbol
    const position = req.body.position
    const date = JSON.parse(req.body.date)
    const session = req.body.session
    const lotsize = parseFloat(JSON.parse(req.body.lotsize))
    const entryprice = parseFloat(JSON.parse(req.body.entryprice))
    const stoploss = parseFloat(JSON.parse(req.body.stoploss))
    const takeprofit = parseFloat(JSON.parse(req.body.takeprofit))
    const exitprice = parseFloat(JSON.parse(req.body.exitprice))
    const pips = parseFloat(JSON.parse(req.body.pips))
    const netpnl = parseFloat(JSON.parse(req.body.netpnl))
    const percentpnl = parseFloat(JSON.parse(req.body.percentpnl))
    const winloss = req.body.winloss
    const strategy = req.body.strategy
    const mistake = req.body.mistake
    const imagem15 = req.file.filename
    const imagem5 = req.body.imagem5
    const note = req.body.note

    var sql = `INSERT backtestdata (id_backtestport, symbol, position, date, session, lotsize, entryprice, stoploss, takeprofit,exitprice, pips, netpnl, percentpnl, winloss, strategy, mistake, imagem15, imagem5, note) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    try {
        connection.query(
            sql, [id_backtestport, symbol, position, date, session, lotsize, entryprice, stoploss, takeprofit, exitprice, pips, netpnl, percentpnl, winloss, strategy, mistake, imagem15, imagem5, note], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({ message: 'Add Tradingdata Success' })
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
}

const readData = (req, res) => {
    const portid = req.params.id
    var sql = `SELECT * FROM backtestdata WHERE id_backtestport = ?`
    try {
        connection.query(
            sql, [portid], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json(results)
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

const readDataid = (req, res) => {
    const id = req.params.id
    var sql = `SELECT * FROM backtestdata WHERE id_trade = ?`
    try {
        connection.query(
            sql, [id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json(results)
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

const updateData = (req, res) => {
    const id = req.body.id
    const symbol = req.body.symbol
    const position = req.body.position
    const date = new Date()
    const session = req.body.session
    const lotsize = req.body.lotsize
    const entryprice = req.body.entryprice
    const stoploss = req.body.stoploss
    const takeprofit = req.body.takeprofit
    const exitprice = req.body.exitprice
    const pips = req.body.pips
    const netpnl = req.body.netpnl
    const percentpnl = req.body.percentpnl
    const winloss = req.body.winloss
    const tradesetup = req.body.tradesetup
    const mistakes = req.body.mistakes
    const screenshots = req.body.screenshots
    const note = req.body.note
    var sql = 'UPDATE tradingdata SET symbol = ? , position = ? , date = ? , session = ? , lotsize = ? , entryprice = ? , stoploss = ? , takeprofit = ? , exitprice	= ? , pips	= ? , netpnl	= ? , percentpnl = ? , winloss	= ? , tradesetup	= ? , mistakes	= ? , screenshots	= ? , note	= ? WHERE id = ? '
    try {
        connection.query(
            sql, [symbol, position, date, session, lotsize, entryprice, stoploss, takeprofit, exitprice, pips, netpnl, percentpnl, winloss, tradesetup, mistakes, screenshots, note, id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    res.status(200).json({ message: "Update Success" })
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}


const deleteData = (req, res) => {
    const id = req.params.id
    var sql = 'DELETE FROM tradingdata WHERE id = ?'
    try {
        connection.query(
            sql, [id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    res.status(200).json({ message: "DELETE Success" })
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage })

const uploadfile = (req, res) => {
    const test = req.body.testtext
    res.status(200).json({ message: "upload success" })
    console.log(req.file.filename);
    console.log(test);
}

module.exports = {
    createData,
    readData,
    updateData,
    deleteData,
    readDataid,
    uploadfile,
    upload
};