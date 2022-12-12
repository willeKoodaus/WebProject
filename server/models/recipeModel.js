const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: false
  },
  comment: {
    type: String,
    required: false
  }
},{ timestamps: true })

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
}, { timestamps: false })

const likesSchema = new Schema({
  user_id: {
    type: String,
    required: false
  }
},{ timestamps: false })

const recipeSchema = new Schema({
  recipeName: {
    type: String,
    required: true
  },
  ingredients: [ingredientSchema],
  instructions: {
    type: String,
    required: true
  },
  likes: [likesSchema],
  reviews: [reviewSchema],
  img: {
    type: String,
    required: false
    },
  publicity: {
    type: Boolean,
    required: false
    },
  user_id: {
    type: String,
    required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Recipe', recipeSchema)