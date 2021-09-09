const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3050;

app.use(bodyParser.json());

// Route
app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

// all customers
app.get('/tbl_usuario', (req, res) => {
    const sql = 'SELECT * FROM tbl_usuario';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Not result');
        }
    });
});

app.get('/tbl_usuario/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM tbl_usuario WHERE id = ${id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;

        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});

app.post('/add', (req, res) => {
    const sql = 'INSERT INTO tbl_usuario SET ?';

    const customerObj = {
        nombre_usuario: req.body.nombre_usuario,
        cedula_usuario: req.body.cedula_usuario,
        teléfono_usuario: req.body.teléfono_usuario,
        mail_usuario: req.body.mail_usuario
    };

    connection.query(sql, customerObj, error => {
        if (error) throw error;
        res.send('tbl_usuario created!');
    });
});

app.put('/update/:id', (req, res) => {
    const { id_usuario } = req.params;
    const { nombre_usuario, cedula_usuario, mail_usuario, teléfono_usuario  } = req.body;
    const sql = `UPDATE tbl_usuario SET nombre_usuario = '${nombre_usuario}', cedula_usuario='${cedula_usuario}', mail_usuario = '${mail_usuario}', teléfono_usuario = '${teléfono_usuario}', WHERE id_usuario =${id_usuario}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('tbl_usuario updated!');
    });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM tbl_usuario WHERE id= ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Delete tbl_usuario');
    });
});





//mysql
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'reactestdb'
});

// check connect
connection.connect(error => {
    if (error) throw error;
    console.log('database server running!');
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));