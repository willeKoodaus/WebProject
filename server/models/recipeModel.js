const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ingredientSchema = new Schema({
  ingredient: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  }
}, { timestamps: true })

const recipeSchema = new Schema({
  recipeName: {
    type: String,
    required: true
  },
  ingredients: [ingredientSchema],
  instructions: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Recipe', recipeSchema)