const { Pool } = require('pg');

const pool = new Pool({
    host: 'dpg-coptgcv79t8c73860p20-a',
    user: 'jairo',
    password: 'c0jQZZXcAT4AFwMykKMHNQaIyLtD6arj',
    database: 'firstapi_6kiu',
    port: '5432',
    ssl: true
});

/*const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});*/

/*const pool = new Pool({
    host: 'localhost',
    user: 'jairo',
    password: '123',
    database: 'firstapi',
    port: '5432'
});*/


const getUsers = async (req, res) => { 
    //const response = await pool.query('SELECT NOW()');
   const response = await pool.query('SELECT * FROM users');
    res.json(response.rows);
     //res.status(200).json(response.rows);
}

const getUserById = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM users WHERE id = $1',[id]);
    res.json(response.rows);
}

const deleteUser = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM users WHERE id = $1',[id]);
    res.json('User ${id} delete succefully');
}

const updateUser = async (req, res) =>{
    const id = req.params.id;
    const {name, email}  = req.body;
    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name,email,id]);
    res.send('User Updated');
    console.log(response);
}

const createUser = async (req, res) =>{
const {name, email}  = req.body;
const response = await pool.query('INSERT INTO  users (name, email) VALUES ($1, $2)', 
[name, email])
console.log(response);
res.json({
    message: 'User Added Succesfully',
    body:{
        user: {name, email}
    }
})
};

module.exports = {
    deleteUser,
    getUserById,
    getUsers,
    createUser,
    updateUser
}