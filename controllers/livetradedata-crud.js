const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tradingserver'
});


const createData = (req,res) =>{

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

    var sql = `INSERT tradingdata (symbol,position,date,session,lotsize,entryprice,stoploss,takeprofit,exitprice,pips,netpnl,percentpnl,winloss,tradesetup,mistakes,screenshots,note) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    try {
        connection.query(
            sql,[symbol,position,date,session,lotsize,entryprice,stoploss,takeprofit,exitprice,pips,netpnl,percentpnl,winloss,tradesetup,mistakes,screenshots,note],(err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({message:'Add Tradingdata Success'})
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

const readData = (req,res) =>{
    var sql = `SELECT * FROM tradingdata;`
    try {
        connection.query(
            sql, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({tradingdata:results})
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

const readDataid = (req,res) =>{
    const id = req.params.id
    var sql = `SELECT * FROM tradingdata WHERE id = ?`
    try {
        connection.query(
            sql,[id], (err, results) => {
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

const updateData = (req,res) =>{
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
            sql, [symbol,position,date,session,lotsize,entryprice,stoploss,takeprofit,exitprice,pips,netpnl,percentpnl,winloss,tradesetup,mistakes,screenshots,note,id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    res.status(200).json({message:"Update Success"})
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}


const deleteData = (req,res) =>{
    const id = req.params.id
    var sql = 'DELETE FROM tradingdata WHERE id = ?'
    try {
        connection.query(
            sql,[id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    res.status(200).json({message:"DELETE Success"})
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

module.exports = {
    createData,
    readData,
    updateData,
    deleteData,
    readDataid
};