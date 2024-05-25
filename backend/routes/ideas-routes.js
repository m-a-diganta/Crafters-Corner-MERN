const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const ideasController = require("../controllers/ideas-controller");

router.get("/", ideasController.getIdeas);
router.get("/:iid", ideasController.getIdeaById);
router.get("/user/:uid", ideasController.getIdeasByUserId);
router.get("/date/:date", ideasController.getIdeasByDate);

router.use(checkAuth("any"));

router.post(
  "/new",
  ideasController.createIdea
);

router.patch(
  "/:iid",
  ideasController.editIdea
);

router.delete("/:iid", ideasController.deleteIdea);

module.exports = router;
