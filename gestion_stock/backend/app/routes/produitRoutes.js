const express = require('express');
const router = express.Router();
const produitController = require('../controller/produitController');

router.post('/produit',produitController.creerProduit);
router.get('/produit',produitController.listeProduit);
router.delete('/produit/:id_p',produitController.supprimerProduit);
router.put('/produit/:id_p',produitController.modificationProduit);
router.get('/produit/count',produitController.countProduit);

router.get('/produit/search', (req, res) => produitController.search(req, res));


module.exports = router;