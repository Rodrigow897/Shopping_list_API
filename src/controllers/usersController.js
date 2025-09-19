const pool = require('../dataBase/db');

const createUsers = async(req, res) =>{
    const{name, email, password} = req.body

    try {
        const user = await pool.query('INSERT INTO tb_users (name, email, password) VALUES ($1, $2,  $3) RETURNING *',
            [name, email, password]
        )
        res.status(201).json(user.rows);
    } catch(err) {
        console.error('error creating user', err)
        res.status(500).json({error: 'error creating user'})
    }
}

const getUsers = async(_, res) =>{
    try {
        const user = await pool.query('SELECT * FROM tb_users')
        res.status(201).json(user.rows);
    } catch (err) {
        console.error('error searching user', err)
        res.status(500).json({error: 'error searching user'})
    }
}

const updateUsers = async (req, res) => {
    const {id} = req.params
    const {name} = req.body

    try {
        const user = await pool.query('UPDATE tb_users SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );
         if (user.rows.length === 0) {
            return res.status(404).json({ error: 'user not found' });
        }
        res.status(201).json(user.rows[0])
    } catch (err) {
        console.log('error updating user', err)
        res.status(500).json({error: 'error updating user'})
    } 
}

const deleteUsers = async(req, res) =>{
    const {id} = req.params
    try {
        const user = await pool.query('DELETE FROM tb_users WHERE id = $1',[id])
        if (user.rowCount === 0) {
            return res.status(404).json({error: 'user not found'});
        }
        res.status(201).json({message: 'user deleted successfully'})
    } catch (err) {
        console.log('error deleting user', err)
        res.status(500).json({error: 'error deleting user'})
    }
}

module.exports = {
    createUsers,
    getUsers,
    updateUsers,
    deleteUsers
}