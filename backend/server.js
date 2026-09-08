const express = require("express");
const cors = require("cors");

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

const perfil = {
  nome: "Future Eternus VI",
  apelido: "Bebop",
  turma: "Scrap Golem",
  area: "The Cursed Apple",
  status: "Forged by the hands of a widowed junk yard attendant",
  objetivo: "bebop? WE BEBOMBIN THESE FOOLS",
  bio: "A scrap golem with a big heart and a bigger extendable arm, Bebop is a potent threat on the battlefield when supported by his team.",
};

const habilidades = [
  {
    nome: "Exploding Uppercut",
    nivel: "Ability 1",
    descricao: "Deal melee damage to nearby enemies and apply knockback. When they land, they deal spirit damage and apply reduced fire rate to other nearby enemies.",
  },
  {
    nome: "Sticky Bomb",
    nivel: "Ability 2",
    descricao: "Attach a bomb that explodes after a delay, dealing spirit damage to nearby enemies. If the bomb hits or kills a hero, you gain permanent bonus damage.",
  },
  {
    nome: "Grapple Arm",
    nivel: "Ability 3",
    descricao: "Launch out a mechanical hand that pulls the first character it hits, reeling them in. Can be used on allies.",
  },
  {
    nome: "Hyper Beam",
    nivel: "Ultimate",
    descricao: "Channel a powerful torrent of energy that deals spirit damage and applies slow.",
  },
];

const projetos = [
  {
    nome: "Hyper Piss Beam",
    tipo: "Mid-boss",
    descricao: "Use the Hyper Beam to gape the enemies asses on midboss.",
  },
  {
    nome: "Bebop's Workshop",
    tipo: "Scrap Yard",
    descricao: "Where Bebop builds his gadgets and prepares for battle.",
  },
  {
    nome: "Sticky Bomb Training",
    tipo: "Combat Drill",
    descricao: "Master the art of attaching bombs and uppercutting enemies into the sky.",
  },
];

const frases = [
  "Sometimes I put these on people and they're like 'oh no, what can I do?' and it's like 'nothing mate - you're gonna blow up!'",
  "People are always like 'ah, there's a bomb stick to me! what can I do?' Nothin, mate! Yer gonna blow up!",
  "Arigato!",
  "I am Bebop! A scrap golem with a big heart and a bigger extendable arm!",
  "Forged by the hands of a widowed junk yard attendant... he was the son she couldn't have.",
  "Bebop can string together his abilities in many different ways. Disrupting enemy positions, saving an ally or dealing bursts of damage.",
];

function sortearFrase() {
  const indice = Math.floor(Math.random() * frases.length);
  return frases[indice];
}

app.get("/", (req, res) => {
  res.json({
    mensagem: "API do DevCard VibeCode está funcionando.",
    rotas: [
      "/api/perfil",
      "/api/habilidades",
      "/api/projetos",
      "/api/frase",
      "/api/devcard",
    ],
  });
});

app.get("/api/perfil", (req, res) => {
  res.json(perfil);
});

app.get("/api/habilidades", (req, res) => {
  res.json(habilidades);
});

app.get("/api/projetos", (req, res) => {
  res.json(projetos);
});

app.get("/api/frase", (req, res) => {
  res.json({
    frase: sortearFrase(),
  });
});

app.get("/api/devcard", (req, res) => {
  res.json({
    perfil,
    habilidades,
    projetos,
    fraseInicial: sortearFrase(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada.",
    dica: "Confira se o endereço foi digitado corretamente.",
    rotasDisponiveis: [
      "/api/perfil",
      "/api/habilidades",
      "/api/projetos",
      "/api/frase",
      "/api/devcard",
    ],
  });
});

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});