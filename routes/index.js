var express = require("express");
var router = express.Router();
const controller = require("./../controller/controller");

/* app routes */
router.get("/", controller.search);
router.get("/visits/:id", controller.visitsEdit);
router.get("/new", controller.newVisit);
router.post("/", controller.visitSave);

module.exports = router;
