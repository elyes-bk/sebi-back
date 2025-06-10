const app = require('./app');
//const port = 8080;
const hostname = '127.0.0.1'
const { Sequelize } = require('sequelize');
const express = require('express');
const router = require('./routes/users');
const sequelize = require('./models');
const bodyParser = require('body-parser');
const modelImage = require('./models/Image');
const generateImage = require('./generateImage');
const ScoreFacile = require("./models/ScoreFacile");
const ScoreDifficile = require("./models/ScoreDifficile");

const url = process.env.URL;
const PORT = process.env.PORT || 3000;


const cors = require('cors');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(router)


const usersData = [];

// Defined the models Users
const Users = sequelize.define('Users', {
  id_user: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true, // Définir id_user comme clé primaire
    autoIncrement: true // Si c'est un identifiant auto-incrémenté
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image_profil: {
    type: Sequelize.STRING,
    allowNull: false
  },
  admin: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});
//initialise the login, sync BDD and insert data
(async () => {
  try{
      await sequelize.authenticate()
      console.log("connecté à la BDD");
      
      //sync of models and bdd
      await  sequelize.sync({ force: false});// force: true => remake the table at any departure
      console.log("Table 'users' synchronisée");

      //Insert the datas's JSON
      await Users.bulkCreate(usersData, {ignoreDuplicates: true})
      console.log("Données JSON insérées dans la BDD");
      
  } catch(error){
      console.error("Erreur de connexion ou d'insertion : ", error);
  }
})();

//envoyé une demande de generation d'image
app.post('/api/generate-image', async (req, res) => {
  try {
    const imageUrl = await generateImage();

    // Insère dans MySQL
    await modelImage.create({ imageUrl });

    res.status(200).json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la génération d’image." });
  }
});
 
//recuperer une image
app.get('/api/image', async (req, res) => {
  try {
    const images = await modelImage.findAll({
      order: [['date', 'DESC']]
    });
    res.status(200).json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des images." });
  }
});

//envoie score facile
app.post("/api/james/scores/facile", async (req, res) => {
  const { pseudo, score } = req.body;
  try {
    await ScoreFacile.create({ pseudo, score });
    res.status(201).json({ message: "Score enregistré !" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Erreur lors de l’enregistrement du score." });
  }
});

//recupere score facile
app.get("/api/james/scores/facile", async (req, res) => {
  try {
    const scores = await ScoreFacile.findAll({
      order: [["score", "DESC"]],
      limit: 5
    });
    res.status(200).json(scores);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

//envoie score difficile
app.post("/api/james/scores/difficile", async (req, res) => {
  const { pseudo, score } = req.body;
  try {
    await ScoreDifficile.create({ pseudo, score });
    res.status(201).json({ message: "Score enregistré !" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Erreur lors de l’enregistrement du score." });
  }
});

//recupere score difficile
app.get("/api/james/scores/difficile", async (req, res) => {
  try {
    const scores = await ScoreDifficile.findAll({
      order: [["score", "DESC"]],
      limit: 5
    });
    res.status(200).json(scores);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

app.listen(PORT, () => {
    //console.log(`Server is listening on port ${hostname}:${port}`)
    console.log(`Server is listening on port ${PORT}`)
});