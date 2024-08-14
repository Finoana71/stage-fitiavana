const express = require('express');
const router = express.Router();
const mouvementController = require('../controller/mouvemenController');
const { authenticate } = require('../controller/AuthController');

router.post('/mouvement',authenticate,mouvementController.creerMouvement);
router.get('/mouvement',mouvementController.listeMouvement);
router.delete('/mouvement/:id_mvt',mouvementController.supprimerMouvement);
router.put('/mouvement/:id_mvt',authenticate,mouvementController.modificationMouvement);
router.get('/mouvement/:id_mvt',mouvementController.getIdMouv);

module.exports = router;