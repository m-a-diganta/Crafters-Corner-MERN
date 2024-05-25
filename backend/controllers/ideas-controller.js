const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const mongoose = require('mongoose');
const Idea = require('../models/idea');
const Seller = require('../models/seller');
const Customer = require('../models/customer');

const getIdeas = async (req, res, next) => {
  let ideas;
  try {
    ideas = await Idea.find();
  } catch (err) {
    const error = new HttpError('Fetching ideas failed', 500);
    return next(error);
  }
  res.json({ ideas: (await ideas).map(idea => idea.toObject({ getters: true })) });
};

const getIdeaById = async (req, res, next) => {
  const ideaId = req.params.iid;
  let idea;
  try {
    idea = await Idea.findById(ideaId);
  } catch (err) {
    const error = new HttpError('Could not find an idea', 500);
    return next(error);
  }

  if (!idea) {
    const error = new HttpError('Could not find an idea for such idea ID', 404);
    return next(error);
  }

  res.json({ idea: idea.toObject({ getters: true }) });
};

const getIdeasByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let ideas;
  try {
    ideas = Idea.find({ postedBy: userId });
  } catch (err) {
    const error = new HttpError('Could not find ideas for the given user', 500);
    return next(error);
  }

  if (!ideas || ideas.length === 0) {
    return next(new HttpError('No ideas found for the given user', 404));
  }

  res.json({ ideas: (await ideas).map(idea => idea.toObject({ getters: true })) });
};

const getIdeasByDate = async (req, res, next) => {
  const date = new Date(req.params.date);

  let ideas;
  try {
    ideas = await Idea.find({ createdAt: { $gte: date, $lte: new Date(date.getTime() + 86400000) } });
  } catch (err) {
    const error = new HttpError('Could not find ideas', 500);
    return next(error);
  }

  if (!ideas || ideas.length === 0) {
    return next(new HttpError('Could not find ideas for such date', 404));
  }

  res.json({ ideas: (await ideas).map(idea => idea.toObject({ getters: true })) });
};

const createIdea = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation Errors:', errors);
    return next(new HttpError('Invalid inputs passed', 422));
  }

  const { title, description } = req.body;
  console.log('Request Body:', req.body);  // Log the request body

  const createdIdea = new Idea({
    title,
    description,
    postedBy: "fds",
  });

  // Log created idea
  console.log('Created Idea:', createdIdea);

  try {
    await createdIdea.save();
  } catch (err) {
    console.error('Error Saving Idea:', err);  // Log the detailed error
    const error = new HttpError('Creating idea failed', 500);
    return next(error);
  }

  res.status(201).json({ idea: createdIdea });
};

const editIdea = async (req, res, next) => {
  const { title, description } = req.body;
  const ideaId = req.params.iid;

  let idea;
  try {
    idea = await Idea.findById(ideaId);
  } catch (err) {
    const error = new HttpError('Could not find an idea', 500);
    return next(error);
  }

  if (!idea) {
    const error = new HttpError('Could not find an idea for such idea ID', 404);
    return next(error);
  }

  if (title !== undefined) idea.title = title;
  if (description !== undefined) idea.description = description;

  try {
    await idea.save();
  } catch (err) {
    if (err.name === 'ValidationError') {
      // Handle validation errors
      const errors = Object.values(err.errors).map(error => error.message);
      const error = new HttpError(`Idea validation failed: ${errors.join(', ')}`, 422);
      return next(error);
    } else {
      // Handle other errors
      console.error('Error updating idea:', err);
      const error = new HttpError('Could not update an idea', 500);
      return next(error);
    }
  }

  res.status(200).json({ idea: idea.toObject({ getters: true }) });
};

const deleteIdea = async (req, res, next) => {
  const ideaId = req.params.iid;

  let idea;
  try {
    idea = await Idea.findById(ideaId);
  } catch (err) {
    const error = new HttpError('Could not delete idea', 500);
    return next(error);
  }

  if (!idea) {
    const error = new HttpError('Could not find idea for such id', 404);
    return next(error);
  }

  try {
    await idea.deleteOne();
  } catch (err) {
    if (err.name === 'ValidationError') {
      // Handle validation errors
      const errors = Object.values(err.errors).map(error => error.message);
      const error = new HttpError(`Idea validation failed: ${errors.join(', ')}`, 422);
      return next(error);
    } else {
      // Handle other errors
      console.error('Error deleting idea:', err);
      const error = new HttpError('Could not delete an idea', 500);
      return next(error);
    }
  }

  res.status(200).json({ message: 'Deleted Idea' });
};

exports.getIdeas = getIdeas;
exports.getIdeaById = getIdeaById;
exports.getIdeasByUserId = getIdeasByUserId;
exports.getIdeasByDate = getIdeasByDate;
exports.createIdea = createIdea;
exports.editIdea = editIdea;
exports.deleteIdea = deleteIdea;