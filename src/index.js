const express = require('express');
const app = express();
const routerUsers = require('./routers/usersRouter')

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('welcome to shopping list API 🚀')
});

app.use('/users', routerUsers)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`server running on port = ${PORT}`)
})