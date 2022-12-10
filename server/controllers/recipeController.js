const Recipe = require('../models/recipeModel')
const mongoose = require('mongoose')

// get all recipes
const getRecipes = async (req, res) => {
  const user_id = req.user._id

  const recipes = await Recipe.find({user_id}).sort({createdAt: -1})

  res.status(200).json(recipes)
}

// get all public recipes
const getPublicRecipes = async (req, res) => {
  const publicity = true
  
  const recipes = await Recipe.find({publicity}).sort({createdAt: -1})

  res.status(200).json(recipes)
}

// get a single recipe
const getRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such recipe'})
  }

  const recipe = await Recipe.findById(id)

  if (!recipe) {
    return res.status(404).json({error: 'No such recipe'})
  }
  
  res.status(200).json(recipe)
}


// create new recipe
const createRecipe = async (req, res) => {
  const {recipeName, ingredients, instructions, likes, reviews, publicity} = req.body

  let emptyFields = []

  if(!recipeName) {
    emptyFields.push('recipeName')
  }
  if(!instructions) {
    emptyFields.push('instructions')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const recipe = await Recipe.create({recipeName, ingredients, instructions, likes, reviews, publicity, user_id})
    res.status(200).json(recipe)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a recipe
const deleteRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such recipe'})
  }

  const recipe = await Recipe.findOneAndDelete({_id: id})

  if (!recipe) {
    return res.status(400).json({error: 'No such recipe'})
  }

  res.status(200).json(recipe)
}

// update a recipe
const updateRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such recipe'})
  }

  const recipe = await Recipe.findOneAndUpdate({_id: id}, {
    ...req.body
  }, {new: true})

  if (!recipe) {
    return res.status(400).json({error: 'No such recipe'})
  }

  res.status(200).json(recipe)
}


module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getPublicRecipes
}