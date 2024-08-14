const express = require('express');
// const router = express.Router();
const sequelize = require('./app/config/bd_config');

const produitRoutes = require('./app/routes/produitRoutes');
const depotRoutes = require('./app/routes/depotRoutes');
const mouvementRoutes = require('./app/routes/mouvementRoutes');
const UtilisateurRoutes = require('./app/routes/utilisateurRoutes');
const StockRoutes = require('./app/routes/stockRoutes');
const authRoutes = require('./app/routes/auth');


const app = express();
app.use(express.json());

// access origin
const cors = require("cors");
var corsOptions = {
    origin: ["http://localhost:4200"] // Url Angular
};


app.use(cors(corsOptions));

// Routes
app.use('/api',produitRoutes);
app.use('/api',depotRoutes);
app.use('/api',mouvementRoutes);
app.use('/api',UtilisateurRoutes);
app.use('/api',StockRoutes);
app.use('/api', authRoutes);

app.use('/fichier',express.static(__dirname + '/app/uploads/'));

//start servers
const startServer = async () => {  

    try {
        await  sequelize.sync().then(()=>{
            console.log("Database & tables creer");
        })
    } catch (error) {
        console.log("Erreur de creer ",error);
    }

    try {
        await sequelize.sync(); // creer tout les tables
        app.listen(8081, () =>{
            console.log("Serveur en marche en localhost:8081");
        });
    } catch (error) {
        console.log('Erreur de se connecter',error);
    }
}
startServer();