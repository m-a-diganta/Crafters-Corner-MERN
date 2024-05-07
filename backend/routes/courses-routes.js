const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const coursesController = require('../controllers/courses-controller');

router.get('/', coursesController.getCourses);
router.get('/:cid', coursesController.getCourseById);
router.get('/sellercourses/:sid', coursesController.getCoursesBySellerId);
router.get('/category/:category', coursesController.getCoursesByCategory);
router.post("/new", coursesController.createCourse);
router.patch("/:cid", coursesController.updateCourse);
router.delete('/:cid', coursesController.deleteCourse);

module.exports = router;
