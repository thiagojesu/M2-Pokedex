const express = require("express");

const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const listapokemon = [
  {
    id: 1,
    nome: "Bulbasaur",
    tipo: "Grass",
    descricao: "Há uma semente de planta nas costas desde o dia em que este Pokémon nasce. A semente cresce lentamente.",
    altura: "0,7 m",
    peso: "6,9 kg",
    categoria: "Semente",
    habilidade: "Superar",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
  },
  {
    id: 2,
    nome: "Charmander",
    tipo: "Fogo",
    descricao: "Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta de sua cauda.",
    altura: "0,6 m",
    peso: "8,5kg",
    categoria: "Lagarto",
    habilidade: "Chama",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
  },
  {
    id: 3,
    nome: "Squirtle",
    tipo: "Agua",
    descricao: "Quando retrai seu longo pescoço em sua concha, esguicha água com força vigorosa.",
    altura: "0,5 m",
    peso: "9,0 kg",
    categoria: "Tartaruga Minúscula",
    habilidade: "Torrente",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
  },
];

let pokemon = undefined;

app.get("/", (req, res) => {
  res.render("index", { listapokemon, pokemon });
});

app.post("/create", (req, res) => {
  const pokemon = req.body;
  pokemon.id = listapokemon.length + 1;
  listapokemon.push(pokemon);
  res.redirect("/#cards");
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  pokemon = listapokemon.find((pokemon) => pokemon.id == id);
  res.redirect("/#cadastro");
})

app.post("/update/:id", (req, res) => {
  const id = +req.params.id -1;
  const novopokemon = req.body;
  novopokemon.id = id + 1;
  listapokemon[id] = novopokemon;
  pokemon = undefined;
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete listapokemon[id];
  res.redirect("/#cards");
});

app.listen(port, () =>{
  console.log(`Servidor rodando em http://localhost:${port}`)
});