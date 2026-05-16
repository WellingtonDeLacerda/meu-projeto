const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const usuarios = []

function salvarDados(nome,email,senha) {
    const save = {
        nome : nome,
        email : email,
        senha : senha
    }
    usuarios.push(save)
    return save
}

app.post("/cadastro", (req, res) => {
    const dadosCad = req.body
   
   const emailExiste = usuarios.find((user) => {
        return user.email === dadosCad.email
    })

    if(emailExiste) {
        return res.status(400).send("Esse email já existe")
    }
     salvarDados(dadosCad.usuario,dadosCad.email,dadosCad.senha)
    console.log(usuarios)
    res.status(200).send("Conta criada")
})
app.post("/login", (req, res) => {

    const { email, senha } = req.body

    const usuario = usuarios.find(user => user.email === email)

    if (!usuario) {
    return res.json({
        erro: "Email não encontrado"
    })
    }

    if (usuario.senha !== senha) {
        return res.json({
            erro: "Senha incorreta"
        })
    }

    res.json({
        nome: usuario.nome
    })
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})