const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const mongoose = require('mongoose');
const Course = require('../models/course');
const Seller = require('../models/seller');

const getCourses = async (req, res, next) => {
  let courses;
  try {
    courses = await Course.find();
  } catch (err) {
    const error = new HttpError('Fetching courses failed', 500);
    return next(error);
  }
  res.json({ courses: (await courses).map(course => course.toObject({ getters: true })) });
};

const getCourseById = async (req, res, next) => {
  const courseId = req.params.cid;
  let course;
  try {
    course = await Course.findById(courseId);
  } catch (err) {
    const error = new HttpError('Could not find a course', 500);
    return next(error);
  }

  if (!course) {
    const error = new HttpError('Could not find a course for such course ID', 404);
    return next(error);
  }

  res.json({ course: course.toObject({ getters: true }) });
};

const getCoursesBySellerId = async (req, res, next) => {
  const sellerId = req.params.sid;

  let courses;
  try {
    courses = Course.find({ seller: sellerId });
  } catch (err) {
    const error = new HttpError('Could not find courses for the given seller', 500);
    return next(error);
  }

  if (!courses || courses.length === 0) {
    return next(new HttpError('No courses found for the given seller', 404));
  }

  res.json({ courses: (await courses).map(course => course.toObject({ getters: true })) });
};

const getCoursesByCategory = async (req, res, next) => {
  const category = req.params.category;

  let courses;
  try {
    courses = await Course.find({ category: category });
  } catch (err) {
    const error = new HttpError('Could not find courses', 500);
    return next(error);
  }

  if (!courses || courses.length === 0) {
    return next(new HttpError('Could not find courses for such category', 404));
  }

  res.json({ courses: (await courses).map(course => course.toObject({ getters: true })) });
};

const createCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError('Invalid inputs passed', 422));
  }

  const { title, description, price, category } = req.body;

  const createdCourse = new Course({
    title,
    description,
    price,
    category,
    image: req.file.path,
    rating: [],
    seller: req.userData.userId,
  });
  let user;
  try {
    user = await Seller.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError('Creating Course Failed', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Couldnt find user for the provided ID', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdCourse.save({ session: sess });
    user.courseList.push(createdCourse);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError('Creating Course Failed 2', 500);
    return next(error);
  }

  res.status(201).json({ course: createdCourse });
};

const updateCourse = async (req, res, next) => {

  const { title, description, price, category, image, stock } = req.body;
  const courseId = req.params.cid;

  let course;
  try {
    course = await Course.findById(courseId);
  } catch (err) {
    const error = new HttpError('Could not find a course', 500);
    return next(error);
  }

  if (title !== undefined) course.title = title;
  if (description !== undefined) course.description = description;
  if (price !== undefined) course.price = price;
  if (category !== undefined) course.category = category;
  if (image !== undefined) course.image = image;
  if (stock !== undefined) course.stock = stock;

  try {
    await course.save();
  } catch (err) {
    if (err.name === 'ValidationError') {
      // Handle validation errors
      const errors = Object.values(err.errors).map(error => error.message);
      const error = new HttpError(`Course validation failed: ${errors.join(', ')}`, 422);
      return next(error);
    } else {
      // Handle other errors
      console.error('Error updating course:', err);
      const error = new HttpError('Could not update a course', 500);
      return next(error);
    }
  }

  res.status(200).json({ course: course.toObject({ getters: true }) });
};

const deleteCourse = async (req, res, next) => {
  const courseId = req.params.cid;

  let course;
  try {
    course = await Course.findById(courseId);
  } catch (err) {
    const error = new HttpError('Could not delete course', 500);
    return next(error);
  }

  if (!course) {
    const error = new HttpError('Could not find course for such id', 404);
    return next(error);
  }

  const sellerId = course.seller;
  const seller = await Seller.findById(sellerId);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await course.deleteOne({ session: sess });
    seller.courseList.pull(course._id);
    await seller.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    if (err.name === 'ValidationError') {
      // Handle validation errors
      const errors = Object.values(err.errors).map(error => error.message);
      const error = new HttpError(`Course validation failed: ${errors.join(', ')}`, 422);
      return next(error);
    } else {
      // Handle other errors
      // console.error('Error deleting course:', err);
      const error = new HttpError('Could not delete a course', 500);
      return next(error);
    }
  }

  res.status(200).json({ message: 'Deleted Course' });
};

exports.getCourses = getCourses;
exports.getCoursesBySellerId = getCoursesBySellerId;
exports.getCourseById = getCourseById;
exports.getCoursesByCategory = getCoursesByCategory;
exports.createCourse = createCourse;
exports.updateCourse = updateCourse;
exports.deleteCourse = deleteCourse;
