import express, { response } from "express";

const app = express();

/**
 * Query: 
 * Route:
 * Body:
 */

app.get("/games", (request, response) => {
  return response.json([]);
});

app.post("/ads", (request, response) => {
  return response.status(201).json([]);
});

app.get("/games/:id/ads", (request, response) => {
  const gameId = request.params.id;

  return response.send(gameId);

  return response.json([
    { id: 1, name: "Ad 1" },
    { id: 2, name: "Ad 2" },
    { id: 3, name: "Ad 3" },
    { id: 4, name: "Ad 4" },
    { id: 5, name: "Ad 5" },
  ])
})


app.get("/ads/:id/discord", (request, response) => {
  // const adId = request.params.id;


  return response.json([])
})

app.listen(3333) //aplicação fica ouvindo a porta 3333, e não para de rodar até o usuário fechar o terminal

