const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

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
        name: req.body.name,
        city: req.body.city
    };

    connection.query(sql, customerObj, error => {
        if (error) throw error;
        res.send('tbl_usuario created!');
    });
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, city } = req.body;
    const sql = `UPDATE tbl_usuario SET name = '${name}', city='${city}' WHERE id =${id}`;

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