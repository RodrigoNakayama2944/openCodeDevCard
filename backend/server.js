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

const lojaItens = [
  { nome: "Close Quarters", categoria: "weapon", tier: 1, custo: 800 },
  { nome: "Extended Magazine", categoria: "weapon", tier: 1, custo: 800 },
  { nome: "Headshot Booster", categoria: "weapon", tier: 1, custo: 800 },
  { nome: "High-Velocity Rounds", categoria: "weapon", tier: 1, custo: 800 },
  { nome: "Monster Rounds", categoria: "weapon", tier: 1, custo: 800 },
  { nome: "Rapid Rounds", categoria: "weapon", tier: 1, custo: 800 },
  { nome: "Restorative Shot", categoria: "weapon", tier: 1, custo: 800 },
  { nome: "Active Reload", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Fleetfoot", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Intensifying Magazine", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Kinetic Dash", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Long Range", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Melee Charge", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Mystic Shot", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Opening Rounds", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Recharging Rush", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Slowing Bullets", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Spirit Shredder Bullets", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Split Shot", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Stalker", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Swift Striker", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Titanic Magazine", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Weakening Headshot", categoria: "weapon", tier: 2, custo: 1600 },
  { nome: "Alchemical Fire", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Ballistic Enchantment", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Berserker", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Blood Tribute", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Burst Fire", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Cultist Sacrifice", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Escalating Resilience", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Express Shot", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Headhunter", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Heroic Aura", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Hollow Point Ward", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Hunter's Aura", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Point Blank", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Shadow Weave", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Sharpshooter", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Spirit Rend", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Tesla Bullets", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Toxic Bullets", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Weighted Shot", categoria: "weapon", tier: 3, custo: 3200 },
  { nome: "Armor Piercing Rounds", categoria: "weapon", tier: 4, custo: 6400 },
  { nome: "Capacitor", categoria: "weapon", tier: 4, custo: 6400 },
  { nome: "Shadow Strike", categoria: "weapon", tier: 4, custo: 6400 },
  { nome: "Crippling Headshot", categoria: "weapon", tier: 4, custo: 6400 },
  { nome: "Crushing Fists", categoria: "weapon", tier: 4, custo: 6400 },
  { nome: "Frenzy", categoria: "weapon", tier: 4, custo: 6400 },
  { nome: "Glass Cannon", categoria: "weapon", tier: 4, custo: 6400 },
  { nome: "Lucky Shot", categoria: "weapon", tier: 4, custo: 6400 },
  { nome: "Ricochet", categoria: "weapon", tier: 4, custo: 6400 },
  { nome: "Silencer", categoria: "weapon", tier: 4, custo: 6400 },
  { nome: "Spellslinger", categoria: "weapon", tier: 4, custo: 6400 },
  { nome: "Spiritual Overflow", categoria: "weapon", tier: 4, custo: 6400 },
  // Vitality
  { nome: "Extra Health", categoria: "vitality", tier: 1, custo: 800 },
  { nome: "Extra Regen", categoria: "vitality", tier: 1, custo: 800 },
  { nome: "Extra Stamina", categoria: "vitality", tier: 1, custo: 800 },
  { nome: "Grit", categoria: "vitality", tier: 1, custo: 800 },
  { nome: "Healing Rite", categoria: "vitality", tier: 1, custo: 800 },
  { nome: "Melee Lifesteal", categoria: "vitality", tier: 1, custo: 800 },
  { nome: "Rebuttal", categoria: "vitality", tier: 1, custo: 800 },
  { nome: "Sprint Boots", categoria: "vitality", tier: 1, custo: 800 },
  { nome: "Battle Vest", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Bullet Lifesteal", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Debuff Reducer", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Enchanter's Emblem", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Enduring Speed", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Guardian Ward", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Healbane", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Healing Booster", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Reactive Barrier", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Restorative Locket", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Return Fire", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Spirit Lifesteal", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Spirit Shielding", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Trophy Collector", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Weapon Shielding", categoria: "vitality", tier: 2, custo: 1600 },
  { nome: "Bullet Resilience", categoria: "vitality", tier: 3, custo: 3200 },
  { nome: "Counterspell", categoria: "vitality", tier: 3, custo: 3200 },
  { nome: "Dispel Magic", categoria: "vitality", tier: 3, custo: 3200 },
  { nome: "Fortitude", categoria: "vitality", tier: 3, custo: 3200 },
  { nome: "Fury Trance", categoria: "vitality", tier: 3, custo: 3200 },
  { nome: "Healing Nova", categoria: "vitality", tier: 3, custo: 3200 },
  { nome: "Lifestrike", categoria: "vitality", tier: 3, custo: 3200 },
  { nome: "Majestic Leap", categoria: "vitality", tier: 3, custo: 3200 },
  { nome: "Metal Skin", categoria: "vitality", tier: 3, custo: 3200 },
  { nome: "Rescue Beam", categoria: "vitality", tier: 3, custo: 3200 },
  { nome: "Spirit Resilience", categoria: "vitality", tier: 3, custo: 3200 },
  { nome: "Warp Stone", categoria: "vitality", tier: 3, custo: 3200 },
  { nome: "Cheat Death", categoria: "vitality", tier: 4, custo: 6400 },
  { nome: "Diviner's Kevlar", categoria: "vitality", tier: 4, custo: 6400 },
  { nome: "Healing Tempo", categoria: "vitality", tier: 4, custo: 6400 },
  { nome: "Indomitable", categoria: "vitality", tier: 4, custo: 6400 },
  { nome: "Juggernaut", categoria: "vitality", tier: 4, custo: 6400 },
  { nome: "Leech", categoria: "vitality", tier: 4, custo: 6400 },
  { nome: "Phantom Strike", categoria: "vitality", tier: 4, custo: 6400 },
  { nome: "Plated Armor", categoria: "vitality", tier: 4, custo: 6400 },
  { nome: "Siphon Bullets", categoria: "vitality", tier: 4, custo: 6400 },
  { nome: "Spellbreaker", categoria: "vitality", tier: 4, custo: 6400 },
  { nome: "Unstoppable", categoria: "vitality", tier: 4, custo: 6400 },
  { nome: "Vampiric Burst", categoria: "vitality", tier: 4, custo: 6400 },
  { nome: "Witchmail", categoria: "vitality", tier: 4, custo: 6400 },
  { nome: "Infuser", categoria: "vitality", tier: 4, custo: 6400 },
  // Spirit
  { nome: "Extra Charge", categoria: "spirit", tier: 1, custo: 800 },
  { nome: "Extra Spirit", categoria: "spirit", tier: 1, custo: 800 },
  { nome: "Golden Goose Egg", categoria: "spirit", tier: 1, custo: 800 },
  { nome: "Mystic Burst", categoria: "spirit", tier: 1, custo: 800 },
  { nome: "Mystic Expansion", categoria: "spirit", tier: 1, custo: 800 },
  { nome: "Mystic Regeneration", categoria: "spirit", tier: 1, custo: 800 },
  { nome: "Rusted Barrel", categoria: "spirit", tier: 1, custo: 800 },
  { nome: "Spirit Strike", categoria: "spirit", tier: 1, custo: 800 },
  { nome: "Arcane Surge", categoria: "spirit", tier: 2, custo: 1600 },
  { nome: "Bullet Resist Shredder", categoria: "spirit", tier: 2, custo: 1600 },
  { nome: "Cold Front", categoria: "spirit", tier: 2, custo: 1600 },
  { nome: "Compress Cooldown", categoria: "spirit", tier: 2, custo: 1600 },
  { nome: "Duration Extender", categoria: "spirit", tier: 2, custo: 1600 },
  { nome: "Improved Spirit", categoria: "spirit", tier: 2, custo: 1600 },
  { nome: "Mystic Slow", categoria: "spirit", tier: 2, custo: 1600 },
  { nome: "Mystic Vulnerability", categoria: "spirit", tier: 2, custo: 1600 },
  { nome: "Quicksilver Reload", categoria: "spirit", tier: 2, custo: 1600 },
  { nome: "Slowing Hex", categoria: "spirit", tier: 2, custo: 1600 },
  { nome: "Spirit Sap", categoria: "spirit", tier: 2, custo: 1600 },
  { nome: "Suppressor", categoria: "spirit", tier: 2, custo: 1600 },
  { nome: "Decay", categoria: "spirit", tier: 3, custo: 3200 },
  { nome: "Disarming Hex", categoria: "spirit", tier: 3, custo: 3200 },
  { nome: "Greater Expansion", categoria: "spirit", tier: 3, custo: 3200 },
  { nome: "Knockdown", categoria: "spirit", tier: 3, custo: 3200 },
  { nome: "Radiant Regeneration", categoria: "spirit", tier: 3, custo: 3200 },
  { nome: "Rapid Recharge", categoria: "spirit", tier: 3, custo: 3200 },
  { nome: "Silence Wave", categoria: "spirit", tier: 3, custo: 3200 },
  { nome: "Spirit Snatch", categoria: "spirit", tier: 3, custo: 3200 },
  { nome: "Superior Cooldown", categoria: "spirit", tier: 3, custo: 3200 },
  { nome: "Superior Duration", categoria: "spirit", tier: 3, custo: 3200 },
  { nome: "Surge of Power", categoria: "spirit", tier: 3, custo: 3200 },
  { nome: "Tankbuster", categoria: "spirit", tier: 3, custo: 3200 },
  { nome: "Torment Pulse", categoria: "spirit", tier: 3, custo: 3200 },
  { nome: "Arctic Blast", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Boundless Spirit", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Cursed Relic", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Echo Shard", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Escalating Exposure", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Ethereal Shift", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Focus Lens", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Lightning Scroll", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Magic Carpet", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Mercurial Magnum", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Mystic Reverb", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Refresher", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Scourge", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Spirit Burn", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Transcendent Cooldown", categoria: "spirit", tier: 4, custo: 6400 },
  { nome: "Vortex Web", categoria: "spirit", tier: 4, custo: 6400 },
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
      "/api/loja",
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

app.get("/api/loja", (req, res) => {
  res.json({
    categorias: ["weapon", "vitality", "spirit"],
    itens: lojaItens,
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
      "/api/loja",
    ],
  });
});

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});