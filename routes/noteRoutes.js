const express = require('express')
const router = express.Router();
const noteController = require("../controllers/noteController");

router.route("/")
    .get()
    .post()
    .patch()
    .delete()

module.exports = router;