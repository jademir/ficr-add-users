const env = require('dotenv')
env.config()

//importa o jsonwebtoken
const jwt = require('jsonwebtoken')
//importa o express
const express = require('express')
//cria o app do tipo express()
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// importa o sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

try {
  sequelize.authenticate().catch(error => {
    console.log(error)
  })
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}



//define a porta do app como a do ambiente ou a 3003
const port = process.env.PORT || 3003

//cria uma rota na raiz do endereço da aplicação que retorna uma mensagem
app.get('/', (req, res) => {
  return res.send('API de cadastro de usuários!')
})

// cria rota de login com jwt
app.post('/login', (req, res) => {
  const user = req.body.user
  const token = jwt.sign(user, process.env.JWT_KEY)
  res.send(token)
})

//coloca a aplicação para escutar na porta definida
app.listen(port, () => { 
  console.log('API iniciada na porta ', port)
})