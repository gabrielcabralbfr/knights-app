const express = require('express');
const router = express.Router();
const { getAll, saveKnight, getById, deleteById, updateKnight } = require("../controllers/knightController")

router.route('/')
  .get(getAll)
  .post(saveKnight)

  router.route('/:knightId')
  .get(getById)
  .delete(deleteById)
  .put(updateKnight)
 

module.exports = router;