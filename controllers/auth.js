const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tradingserver'
});
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const salt = 10;

const register = (req, res) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const role = req.body.role
    var sql = `INSERT user (email,username,password,role) VALUES (?,?,?,?)`
    bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
            console.log(err);
        }
        try {
            connection.query(
                sql, [email, username, hash, role], (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send(err);
                    }
                    else {
                        res.status(200).json({ message: 'Add User Success' })
                    }
                }
            )
        }
        catch (err) {
            console.log(err)
            return res.status(500).send();
        }
    })
}

const login = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    var sql = `SELECT * FROM user WHERE username = ?`
    try {
        connection.query(
            sql, [username], (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }
                if (data.length > 0) {
                    bcrypt.compare(password, data[0].password, (err, response) => {
                        if (err) {
                            return res.json("Error");
                        }
                        if (response) {
                            const token = jwt.sign({ username: data[0].username, role: data[0].role }, "jwtSecretKey", { expiresIn: "1D" })
                            return res.json({ Login: true, token, data })
                        }
                        return res.json({ Login: false })
                    })
                } else {
                    return res.json("Fail")
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

const checkauth = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        var decoded = jwt.verify(token, "jwtSecretKey");
        res.json({ status: 'ok', decoded })
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
}

module.exports = {
    register,
    login,
    checkauth,
};