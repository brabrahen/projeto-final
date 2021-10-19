require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let message = "";

const Basquete = require("./models/nba");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/champs", async (req, res) => {
  const basquete = await Basquete.findAll();

  res.render("campeoes", {
    basquete,
    message
  });
});


app.get("/detalhes/:id", async (req, res) => {
  const basquete = await Basquete.findByPk(req.params.id)
  res.render("detalhes", {
    basquete
  });
});

app.get("/add", (req, res) => {
  res.render("adicionar",{
    message
  });
}); 

app.post("/add", async (req, res) => {
  setTimeout(() => {message = "";}, 1000);
  const { equipe, descricao, card, video } = req.body;

  if (!equipe) {
    res.render("adicionar", {
      message: "Nome é obrigatório",
    });
  }

  else if (!card) {
    res.render("adicionar", {
      message: "Imagem é obrigatória",
    });
  }

  else {
    try {
      const basquete = await Basquete.create({
      equipe,
      descricao,
      card,
      video
    });
    message = "Equipe cadastrada"
    res.redirect("/champs");
    } catch (err) {
      console.log(err);

      res.render("adicionar", {
        message: "Ocorreu um erro ao cadastrar a Equipe",
      });
    }
  }
});

app.get("/edit/:id", async (req, res) => {
  setTimeout(() => {message = "";}, 1000);
  const basquete = await Basquete.findByPk(req.params.id);


  res.render("editar", {
    basquete, 
    message
  });
});

app.post("/edit/:id", async (req, res) => {
  setTimeout(() => {message = "";}, 1000);
  const basquete = await Basquete.findByPk(req.params.id);

  const { equipe, descricao, card, video  } = req.body;

  basquete.equipe = equipe;
  basquete.descricao = descricao;
  basquete.card = card;
  basquete.video = video;
  const basqueteEdit = await basquete.save();
  message = `Equipe ${basquete.equipe} editada com sucesso!`

  res.redirect("/champs")

});

app.get("/apagar/:id", async (req, res) => {
  setTimeout(() => {message = "";}, 1000);
  const basquete = await Basquete.findByPk(req.params.id);

  if (!basquete) {
    res.render("apagar", {
      message: "Equipe não encontrada",
    });
  }

  res.render("apagar", {
    basquete,
    message
  });
});

app.post("/apagar/:id", async (req, res) => {
  setTimeout(() => {message = "";}, 1500);
  const basquete = await Basquete.findByPk(req.params.id);

  if (!basquete) {
    res.render("apagar", {
      message: "Equipe não encontrada"
    });
  }

  await basquete.destroy();
  message = `${basquete.equipe}, foi deletada!`
  res.redirect("/champs");
  
});

app.get("/sobre", (req, res) => {
  res.render("sobre");
}); 

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);