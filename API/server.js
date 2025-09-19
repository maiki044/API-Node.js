import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())



app.post('/usuarios', async (req, res) => {
  //rota para criar um novo usuário
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })
  res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {

  const users = await prisma.user.findMany()
  res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {
  //rota para atualizar um usuário pelo ID
  console.log(req)
  await prisma.user.update({
    where: { 
      id: req.params.id 
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })

  res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
  //rota para deletar um usuário pelo ID
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })

  res.status(200).json({ message: 'Usuário deletado com sucesso' })

})

app.listen(3000)