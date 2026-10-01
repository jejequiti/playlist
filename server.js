// ============================================================
//  API DE PLAYLIST  -  Relacionando Musicas e Artistas
//  Backend 2DAT2  -  3o Trimestre
//  O frontend ja esta pronto em public/. Complete os TODOs.
// ============================================================

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));


// ---- LISTA 1: artistas (cada um tem um id) ----
const artistas = [
  {id: 1, nome: "Legiao Urbana", pais: "Brasil" },
   {id: 2, nome: "Queen", pais: "Reino Unido" },
    {id: 3, nome: "Djavan", pais: "Brasil" },
     {id: 4, nome: "Daft Punk", pais: "França" },
]

// ---- LISTA 2: musicas (guardam so o artistaId, nao o nome) ----
const musicas = [
  { id: 1, titulo: "Tempo perdido", artistaId: 1, duracao: 292},
  { id: 2, titulo: "Tempo perdido", artistaId: 2, duracao: 355},
  { id: 3, titulo: "Tempo perdido", artistaId: 1, duracao: 258},
  { id: 4, titulo: "Tempo perdido", artistaId: 1, duracao: 292},
  { id: 5, titulo: "Tempo perdido", artistaId: 1, duracao: 292},
  { id: 6, titulo: "Don´t Stop", artistaId: 2, duracao: 292},

]


// 1) LISTAR ARTISTAS

  // TODO: responder a lista de artistas com res.status(200).json(...)

  app.get("/artistas", (req, res) => {
    res.status(200).json(artistas);
  });


// 2) LISTAR MUSICAS  (juntando cada musica com o seu artista)
app.get("/musicas", (req, res) => {
  const resultado = musicas.map((m) => {
    const artista = artistas.find((a) => a.id === m.artistaId);
    return {
      titulo: m.titulo,
      duracao: m.duracao,
      artista: artista ? artista.nome : "Desconhecido",
      pais: artista ? artista.pais : "-",
    };
  });
  res.status(200).json(resultado);
});

app.get("/artistas/:id/musicas", (req, res) => {
  const id = Number(req.params.id);
  const doArtista = musicas.filter((m) => m.artistaId === id);
  res.status(200).json(doArtista);
});

app.listen(PORT, () => {
  console.log(`Playlist no ar: http://localhost:${PORT}`);
});

  // TODO: use map para percorrer 'musicas'.
  //       para cada musica, use find em 'artistas' para achar
  //       aquele cujo id === m.artistaId.
  //       devolva um objeto com: titulo, duracao, artista (nome) e pais.
  //       lembre: find pode devolver undefined -> trate com ? :



