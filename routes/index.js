var express = require("express");
var router = express.Router();
const controller = require("./../controller/controller");

/* app routes */
router.get("/", controller.search);
router.get("/visits/print/:id", controller.visitsPrint);
router.get("/visits/new", controller.newVisit);
router.get("/visits/edit/:id", controller.visitEdit);
router.post("/visits/edit/:id", controller.visitupdate);
router.post("/", controller.visitSave);

module.exports = router;
