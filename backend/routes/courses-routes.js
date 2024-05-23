const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

const coursesController = require("../controllers/courses-controller");

router.get("/", coursesController.getCourses);
router.get("/:cid", coursesController.getCourseById);
router.get("/category/:category", coursesController.getCoursesByCategory);

router.use(checkAuth("seller"));
router.get("/sellercourses/:sid", coursesController.getCoursesBySellerId);
router.post("/new", fileUpload.single("image"), coursesController.createCourse);
router.patch("/:cid", coursesController.updateCourse);
router.delete("/:cid", coursesController.deleteCourse);

module.exports = router;
