import express from "express";

const app = express();

app.get("/ads", (request, response) => {
  return response.send('Acessou a rota ads')
})

app.listen(3333) //aplicação fica ouvindo a porta 3333, e não para de rodar até o usuário fechar o terminal

 