const { response } = require('express');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tradingserver'
});

const createData = (req,res) =>{

    const name = req.body.name
    const initialbalance = req.body.initialbalance

    var sql = `INSERT livetrade (name,initialbalance) VALUES (?,?)`
    try {
        connection.query(
            sql,[name,initialbalance],(err) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }
                else {
                    response.status(200).json({message:'Add Livetrade Success'})
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
    var sql = `SELECT * FROM livetrade;`
    try {
        connection.query(
            sql, (err, results) => {
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

const readDataid = (req,res) =>{
    const id = req.params.id
    var sql = `SELECT * FROM livetrade WHERE id = ?`
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
    const id = req.params.id
    const name = req.body.name
    const initialbalance = req.body.initialbalance
    var sql = 'UPDATE livetrade SET name = ? , initialbalance = ? WHERE id = ? '
    try {
        connection.query(
            sql, [name,initialbalance,id], (err) => {
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
    var sql = 'DELETE FROM livetrade WHERE id = ?'
    try {
        connection.query(
            sql,[id], (err) => {
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