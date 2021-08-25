//importa o express
const express = require('express')
//cria o app do tipo express()
const app = express()

//define a porta do app como a do ambiente ou a 3003
const port = process.env.PORT || 3003

//cria uma rota na raiz do endereço da aplicação que retorna uma mensagem
app.get('/', (req, res) => {
  return res.send('API de cadastro de usuários!')
})

//coloca a aplicação para escutar na porta definida
app.listen(port)